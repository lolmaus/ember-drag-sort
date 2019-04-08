// ----- Ember modules -----
import Component from '@ember/component'
import {inject as service} from '@ember/service'
import {reads} from '@ember/object/computed'
import {computed, get, observer} from '@ember/object'
import {next} from '@ember/runloop'

// ----- Ember addons -----

// ----- Own modules -----
import layout from '../templates/components/drag-sort-list'



export default Component.extend({

  // ----- Arguments -----
  items           : undefined,
  group           : undefined,
  draggingEnabled : true,
  childClass      : '',
  childTagName    : 'div',
  handle          : null,

  dragEndAction                  : undefined,
  determineForeignPositionAction : undefined,



  // ----- Services -----
  dragSort : service(),



  // ----- Overridden properties -----
  layout,
  classNameBindings : [
    ':dragSortList',
    'draggingEnabled:-draggingEnabled',
    'isDragging:-isDragging',
    'isDraggingOver:-isDraggingOver',
    'isExpanded2:-isExpanded',
    'isEmpty:-isEmpty',
  ],



  // ----- Static properties -----



  // ----- Aliases -----
  sourceList          : reads('dragSort.sourceList'),
  targetList          : reads('dragSort.targetList'),
  sourceIndex         : reads('dragSort.sourceIndex'),
  draggedItem         : reads('dragSort.draggedItem'),
  lastDragEnteredList : reads('dragSort.lastDragEnteredList'),



  // ----- Computed properties -----
  isDragging : computed('dragSort.{isDragging,group}', 'group', function () {
    const isDragging       = this.get('dragSort.isDragging')
    const group            = this.get('group')
    const groupFromService = this.get('dragSort.group')

    return isDragging && group === groupFromService
  }),

  isDraggingOver : computed('isDragging', 'items', 'targetList', function () {
    const isDragging = this.get('isDragging')
    const items      = this.get('items')
    const targetList = this.get('targetList')

    return isDragging && items === targetList
  }),

  isExpanded : computed('isDragging', 'isEmpty', 'isOnlyElementDragged', function () {
    const isDragging           = this.get('isDragging')
    const isEmpty              = this.get('isEmpty')
    const isOnlyElementDragged = this.get('isOnlyElementDragged')

    return isDragging && (isEmpty || isOnlyElementDragged)
  }),

  isExpanded2 : reads('isExpanded'),

  isEmpty : computed('items.[]', function () {
    const count = this.get('items.length')

    return !count
  }),

  isOnlyElementDragged : computed('items.length', 'items', 'sourceList', 'sourceIndex', function () {
    const count       = this.get('items.length')
    const items       = this.get('items')
    const sourceList  = this.get('sourceList')
    const sourceIndex = this.get('sourceIndex')

    return (
      count === 1
      && items === sourceList
      && !sourceIndex
    )
  }),



  // ----- Overridden methods -----
  dragEnter (event) {
    // Ignore irrelevant drags
    if (!this.get('dragSort.isDragging')) return

    // Ignore irrelevant groups
    const group       = this.get('group')
    const activeGroup = this.get('dragSort.group')
    if (group !== activeGroup) return

    event.stopPropagation()

    // Ignore duplicate events (explanation: https://github.com/lolmaus/jquery.dragbetter#what-this-is-all-about )
    const items               = this.get('items')
    const lastDragEnteredList = this.get('lastDragEnteredList')
    if (items === lastDragEnteredList) return

    this.dragEntering()

    if (this.get('determineForeignPositionAction')) {
      this.forceDraggingOver()
    }
  },


  // ----- Custom methods -----
  dragEntering () {
    const group    = this.get('group')
    const items    = this.get('items')
    const dragSort = this.get('dragSort')

    dragSort.dragEntering({group, items})
  },

  forceDraggingOver () {
    const determineForeignPositionAction = this.get('determineForeignPositionAction')

    const group       = this.get('group')
    const items       = this.get('items')
    const itemsLength = get(items, 'length')
    const draggedItem = this.get('draggedItem')
    const sourceList  = this.get('sourceList')

    let isDraggingUp = true

    let index =
      items === sourceList
        ? items.indexOf(draggedItem) + 1
        : determineForeignPositionAction({draggedItem, items})

    if (index >= itemsLength) {
      index        = itemsLength - 1
      isDraggingUp = false
    }

    this.get('dragSort').draggingOver({group, index, items, isDraggingUp})
  },



  // ----- Observers -----
  setIsExpanded2 : observer('isExpanded', function () {
    // The delay is necessary for HTML class to update with a delay.
    // Otherwise, dragging is finished immediately.
    next(() => {
      if (this.get('isDestroying') || this.get('isDestroyed')) return

      this.set('isExpanded2', this.get('isExpanded'))
    })
  }),
})
