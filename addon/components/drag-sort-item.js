// ----- Ember modules -----
import Component from '@ember/component'
import { assert }  from '@ember/debug'
import {inject as service} from '@ember/service'
import {and, not, reads} from '@ember/object/computed'
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

  dragEndAction                  : undefined,
  determineForeignPositionAction : undefined,



  // ----- Services -----
  dragSort : service(),



  // ----- Overridden properties -----
  layout,
  classNameBindings : [
    ':dragSortItem',
    'isDragged2:-isDragged',
    'isDraggingOver:-isDraggingOver',
    'shouldShowPlaceholderAbove3:-placeholderAbove',
    'shouldShowPlaceholderBelow3:-placeholderBelow',
    'shouldShowPlaceholderToTheLeft:-placeholderLeft',
    'shouldShowPlaceholderToTheRight:-placeholderRight',
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

  shouldShowPlaceholderAbove2     : undefined,
  shouldShowPlaceholderBelow2     : undefined,
  shouldShowPlaceholderAbove3     : and('shouldShowPlaceholderAbove2', 'notHorizontal'),
  shouldShowPlaceholderBelow3     : and('shouldShowPlaceholderBelow2', 'notHorizontal'),
  shouldShowPlaceholderToTheLeft  : and('shouldShowPlaceholderAbove2', 'dragSort.horizontal'),
  shouldShowPlaceholderToTheRight : and('shouldShowPlaceholderBelow2', 'dragSort.horizontal'),
  notHorizontal                   : not('dragSort.horizontal'),

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

  isDraggingOver : computed('dragSort.isDragging', 'items', 'targetList', 'index', 'targetIndex', 'isDragged', function () {
    const isDragging  = this.get('dragSort.isDragging')
    const items       = this.get('items')
    const targetList  = this.get('targetList')
    const index       = this.get('index')
    const targetIndex = this.get('targetIndex')
    const isDragged   = this.get('isDragged')

    return isDragging && items === targetList && index === targetIndex && !isDragged
  }),

  isLast : computed('index', 'items.[]', function () {
    const index = this.get('index')
    const count = this.get('items.length')

    return index === count - 1
  }),

  shouldShowPlaceholderAbove : computed('isDraggingOver', 'isDraggingUp', function () {
    const isDraggingOver = this.get('isDraggingOver')
    const isDraggingUp   = this.get('isDraggingUp')

    return isDraggingOver && isDraggingUp
  }),

  shouldShowPlaceholderBelow : computed('isDraggingOver', 'isDraggingUp', function () {
    const isDraggingOver = this.get('isDraggingOver')
    const isDraggingUp   = this.get('isDraggingUp')

    return isDraggingOver && !isDraggingUp
  }),



  // ----- Overridden methods -----
  didInsertElement () {
    // Consume properties for observers to act
    this.getProperties(
      'shouldShowPlaceholderAbove',
      'shouldShowPlaceholderBelow'
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
      if (event.dataTransfer.setData) event.dataTransfer.setData('text', 'anything')
      if (event.dataTransfer.setDragImage) event.dataTransfer.setDragImage(this.element, 0, 0)
    }

    this.startDragging(event)
  },

  dragEnd (event) {
    // Ignore irrelevant drags
    if (!this.get('dragSort.isDragging')) return

    event.stopPropagation()

    this.endDragging(event)
  },

  dragOver (event) {
    // Ignore irrelevant drags
    if (
      !this.get('dragSort.isDragging')
      || this.get('determineForeignPositionAction')
    ) return

    const group       = this.get('group')
    const activeGroup = this.get('dragSort.group')

    if (group !== activeGroup) return

    event.stopPropagation()

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

    const item     = this.get('item')
    const index    = this.get('index')
    const items    = this.get('items')
    const group    = this.get('group')
    const dragSort = this.get('dragSort')

    dragSort.startDragging({item, index, items, group})
  },

  endDragging () {
    this.restore()

    const action   = this.get('dragEndAction')
    const dragSort = this.get('dragSort')

    dragSort.endDragging({action})
  },

  draggingOver (event) {
    const group        = this.get('group')
    const index        = this.get('index')
    const items        = this.get('items')
    const element      = this.get('element')
    const isHorizontal = this.get('dragSort.horizontal')

    const isPlaceholderBefore   = isHorizontal
      ? this.get('shouldShowPlaceholderToTheLeft')
      : this.get('shouldShowPlaceholderAbove2')

    const isPlaceholderAfter    = isHorizontal
      ? this.get('shouldShowPlaceholderToTheRight')
      : this.get('shouldShowPlaceholderBelow2')

    const placeholderCorrection =
      isPlaceholderBefore ?  getComputedStyleInt(element, isHorizontal ? 'padding-left' : 'padding-top')  :
      isPlaceholderAfter ? -getComputedStyleInt(element, isHorizontal ? 'padding-right' : 'padding-bottom') :
                            0                                                // eslint-disable-line indent
    const offset                = isHorizontal
      ? element.getBoundingClientRect().left
      : element.getBoundingClientRect().top

    const itemSize = isHorizontal
      ? element.offsetWidth
      : element.offsetHeight

    const isDraggingUp = ((isHorizontal ? event.clientX : event.clientY) - offset) < (itemSize + placeholderCorrection) / 2

    this.get('dragSort').draggingOver({group, index, items, isDraggingUp})
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
  setPlaceholderAbove : observer('shouldShowPlaceholderAbove', function () {
    // The delay is necessary for HTML class to update with a delay.
    // Otherwise, dragging is finished immediately.
    next(() => {
      if (this.get('isDestroying') || this.get('isDestroyed')) return
      this.set(
        'shouldShowPlaceholderAbove2',
        this.get('shouldShowPlaceholderAbove')
      )
    })
  }),

  setPlaceholderBelow : observer('shouldShowPlaceholderBelow', function () {
    // The delay is necessary for HTML class to update with a delay.
    // Otherwise, dragging is finished immediately.
    next(() => {
      if (this.get('isDestroying') || this.get('isDestroyed')) return
      this.set(
        'shouldShowPlaceholderBelow2',
        this.get('shouldShowPlaceholderBelow')
      )
    })
  }),
})
