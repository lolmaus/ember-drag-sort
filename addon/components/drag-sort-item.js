// ----- Ember modules -----
import Component from '@ember/component'
import { assert }  from '@ember/debug'
import {inject as service} from '@ember/service'
import {not, reads} from '@ember/object/computed'
import {computed, observer} from '@ember/object'
import {next} from '@ember/runloop'

// ----- Own modules -----
import layout from '../templates/components/drag-sort-item'



function getComputedStyleInt (element, cssProp) {
  const computedStyle = window.getComputedStyle(element, null)
  const valueStr      = computedStyle.getPropertyValue(cssProp)

  return parseInt(valueStr, 10)
}



export default Component.extend({

  // ----- Arguments -----
  item            : undefined,
  index           : undefined,
  items           : undefined,
  group           : undefined,
  childTagName    : 'div',
  draggingEnabled : undefined,
  handle          : null,
  isHorizontal    : false,
  isRtl           : false,
  sourceOnly      : false,

  dragEndAction                  : undefined,
  dragStartAction                : undefined,
  determineForeignPositionAction : undefined,



  // ----- Services -----
  dragSort : service(),



  // ----- Overridden properties -----
  layout,
  classNameBindings : [
    ':dragSortItem',
    'isDragged2:-isDragged',
    'isDraggingOver:-isDraggingOver',
    'shouldShowPlaceholderBefore2:-placeholderBefore',
    'shouldShowPlaceholderAfter2:-placeholderAfter',
    'isTarget:-isTarget:-isTargetNOT',
    'index',
    'targetIndex',
  ],

  attributeBindings : [
    'draggable',
  ],




  // ----- Static properties -----
  isDragged2     : false,
  originalHeight : null,

  shouldShowPlaceholderBefore2 : undefined,
  shouldShowPlaceholderAfter2  : undefined,
  isVertical                   : not('dragSort.isHorizontal'),

  // ----- Aliases -----
  isDraggingUp : reads('dragSort.isDraggingUp'),
  sourceList   : reads('dragSort.sourceList'),
  sourceIndex  : reads('dragSort.sourceIndex'),
  targetIndex  : reads('dragSort.targetIndex'),
  targetList   : reads('dragSort.targetList'),



  // ----- Computed properties -----
  draggable : computed('draggingEnabled', 'handle', function () {
    const handle          = this.get('handle')
    const draggingEnabled = this.get('draggingEnabled')

    return !handle && draggingEnabled ? true : null
  }),

  isDragged : computed('dragSort.isDragging', 'items', 'sourceList', 'index', 'sourceIndex', function () {
    const isDragging  = this.get('dragSort.isDragging')
    const items       = this.get('items')
    const sourceList  = this.get('sourceList')
    const index       = this.get('index')
    const sourceIndex = this.get('sourceIndex')

    return isDragging && items === sourceList && index === sourceIndex
  }),

  isDraggingOver : computed('dragSort.isDragging', 'items', 'targetList', 'index', 'targetIndex', 'isDragged', 'sourceOnly', function () {
    const isDragging  = this.get('dragSort.isDragging')
    const items       = this.get('items')
    const targetList  = this.get('targetList')
    const index       = this.get('index')
    const targetIndex = this.get('targetIndex')
    const isDragged   = this.get('isDragged')
    const sourceOnly  = this.get('sourceOnly')

    return !sourceOnly && isDragging && items === targetList && index === targetIndex && !isDragged
  }),

  isLast : computed('index', 'items.[]', function () {
    const index = this.get('index')
    const count = this.get('items.length')

    return index === count - 1
  }),

  shouldShowPlaceholderBefore : computed('isDraggingOver', 'isDraggingUp', 'sourceOnly', function () {
    const isDraggingOver = this.get('isDraggingOver')
    const isDraggingUp   = this.get('isDraggingUp')
    const sourceOnly     = this.get('sourceOnly')

    return !sourceOnly && isDraggingOver && isDraggingUp
  }),

  shouldShowPlaceholderAfter : computed('isDraggingOver', 'isDraggingUp', 'sourceOnly', function () {
    const isDraggingOver = this.get('isDraggingOver')
    const isDraggingUp   = this.get('isDraggingUp')
    const sourceOnly     = this.get('sourceOnly')

    return !sourceOnly && isDraggingOver && !isDraggingUp
  }),



  // ----- Overridden methods -----
  didInsertElement () {
    // Consume properties for observers to act
    this.getProperties(
      'shouldShowPlaceholderBefore',
      'shouldShowPlaceholderAfter'
    )
  },

  dragStart (event) {
    // Ignore irrelevant drags
    if (!this.get('draggingEnabled')) return

    if (!this.isHandleUsed(event.target)) {
      event.preventDefault()
      return
    }

    event.stopPropagation()

    // Required for Firefox. http://stackoverflow.com/a/32592759/901944
    if (event.dataTransfer) {
      if (event.dataTransfer.setData) event.dataTransfer.setData('text', '')
      if (event.dataTransfer.setDragImage) event.dataTransfer.setDragImage(this.element, 0, 0)
    }

    const dragStartAction = this.get('dragStartAction')

    if (dragStartAction) {
      const element = this.get('element')
      const item    = this.get('item')

      dragStartAction({
        event,
        element,
        draggedItem : item,
      })
    }

    this.startDragging(event)
  },

  dragEnd (event) {
    // Ignore irrelevant drags
    if (!this.get('dragSort.isDragging')) return

    event.stopPropagation()
    event.preventDefault()

    this.endDragging(event)
  },

  // Required for Firefox. http://stackoverflow.com/a/32592759/901944
  drop (event) {
    event.preventDefault()
  },

  dragOver (event) {
    // Ignore irrelevant drags
    if (
      !this.get('dragSort.isDragging')
      || this.get('determineForeignPositionAction')
      || this.get('sourceOnly')
    ) return

    const group       = this.get('group')
    const activeGroup = this.get('dragSort.group')

    if (group !== activeGroup) return

    event.stopPropagation()
    event.preventDefault()

    this.draggingOver(event)
  },

  dragEnter (event) {
    if (!this.get('dragSort.isDragging')) return
    // Without this, dragOver would not fire in IE11. http://mereskin.github.io/dnd/
    event.preventDefault()
  },





  // ----- Custom methods -----
  startDragging () {
    this.collapse()

    const additionalArgs = this.get('additionalArgs')
    const item           = this.get('item')
    const index          = this.get('index')
    const items          = this.get('items')
    const group          = this.get('group')
    const dragSort       = this.get('dragSort')
    const isHorizontal   = this.get('isHorizontal')

    dragSort.startDragging({additionalArgs, item, index, items, group, isHorizontal})
  },

  endDragging () {
    this.restore()

    const action   = this.get('dragEndAction')
    const dragSort = this.get('dragSort')

    dragSort.endDragging({action})
  },

  draggingOver (event) {
    const sourceOnly = this.get('sourceOnly')

    if (sourceOnly) {
      event.preventDefault()
      return
    }

    const group               = this.get('group')
    const index               = this.get('index')
    const items               = this.get('items')
    const element             = this.get('element')
    const isHorizontal        = this.get('dragSort.isHorizontal')
    const isRtl               = this.get('isRtl') && isHorizontal
    const isPlaceholderBefore = this.get('shouldShowPlaceholderBefore2')
    const isPlaceholderAfter  = this.get('shouldShowPlaceholderAfter2')
    const dragSort            = this.get('dragSort')
    const placeholderModifier = isRtl ? -1 : 1

    let beforeAttribute = 'padding-top'
    let afterAttribute  = 'padding-bottom'
    if (isHorizontal) {
      beforeAttribute = isRtl ? 'padding-right' : 'padding-left'
      afterAttribute  = isRtl ? 'padding-left'  : 'padding-right'
    }

    const placeholderCorrection =
      isPlaceholderBefore ?  getComputedStyleInt(element, beforeAttribute) * placeholderModifier :
      isPlaceholderAfter  ? -getComputedStyleInt(element, afterAttribute)  * placeholderModifier :
                             0                                                // eslint-disable-line indent

    const offset =
      isHorizontal
        ? element.getBoundingClientRect().left
        : element.getBoundingClientRect().top

    const itemSize =
      isHorizontal
        ? element.offsetWidth
        : element.offsetHeight

    const mousePosition =
      isHorizontal
        ? event.clientX
        : event.clientY

    const isDraggingUp =
      isRtl
        ? (mousePosition - offset) > (itemSize + placeholderCorrection) / 2
        : (mousePosition - offset) < (itemSize + placeholderCorrection) / 2

    dragSort.draggingOver({group, index, items, isDraggingUp})
  },

  collapse () {
    // The delay is necessary for HTML classes to update with a delay.
    // Otherwise, dragging is finished immediately.
    next(() => {
      if (this.get('isDestroying') || this.get('isDestroyed')) return
      this.set('isDragged2', true)
    })
  },

  restore () {
    // The delay is necessary for HTML class to update with a delay.
    // Otherwise, dragging is finished immediately.
    next(() => {
      if (this.get('isDestroying') || this.get('isDestroyed')) return
      this.set('isDragged2', false)
    })
  },

  isHandleUsed (target) {
    const handle  = this.get('handle')
    const element = this.get('element')

    if (!handle) return true

    const handleElement = element.querySelector(handle)

    assert('Handle not found', !!handleElement)

    return handleElement === target || handleElement.contains(target)
  },



  // ----- Observers -----
  setPlaceholderBefore : observer('shouldShowPlaceholderBefore', function () {
    // The delay is necessary for HTML class to update with a delay.
    // Otherwise, dragging is finished immediately.
    next(() => {
      if (this.get('isDestroying') || this.get('isDestroyed')) return
      this.set(
        'shouldShowPlaceholderBefore2',
        this.get('shouldShowPlaceholderBefore')
      )
    })
  }),

  setPlaceholderAfter : observer('shouldShowPlaceholderAfter', function () {
    // The delay is necessary for HTML class to update with a delay.
    // Otherwise, dragging is finished immediately.
    next(() => {
      if (this.get('isDestroying') || this.get('isDestroyed')) return
      this.set(
        'shouldShowPlaceholderAfter2',
        this.get('shouldShowPlaceholderAfter')
      )
    })
  }),
})
