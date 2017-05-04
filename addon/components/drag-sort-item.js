// ----- Ember modules -----
import Component from 'ember-component'
import service from 'ember-service/inject'
import {reads} from 'ember-computed'
import on from 'ember-evented/on'
import observer from 'ember-metal/observer'
import {next} from 'ember-runloop'

// ----- Ember addons -----
// import computed from 'ember-macro-helpers/computed'
import and from 'ember-awesome-macros/and'
import not from 'ember-awesome-macros/not'
// import or from 'ember-awesome-macros/or'
import eq from 'ember-awesome-macros/eq'
// import cond from 'ember-awesome-macros/conditional'
import subtract from 'ember-awesome-macros/subtract'

// ----- Own modules -----
import layout from '../templates/components/drag-sort-item'



export default Component.extend({

  // ----- Arguments -----
  item                  : undefined,
  index                 : undefined,
  items                 : undefined,
  group                 : undefined,
  childTagName          : 'div',
  placeholderCssValue   : undefined,
  noPlaceholderCssValue : undefined,
  dragEndAction         : undefined,



  // ----- Services -----
  dragSort : service(),



  // ----- Overridden properties -----
  layout,
  classNameBindings : [
    ':dragSortItem',
    'isDragged:-isDragged',
    'isDraggingOver:-isDraggingOver',
    'isCollapsed:-isCollapsed',
    'shouldShowPlaceholderAbove2:-placeholderAbove',
    'shouldShowPlaceholderBelow2:-placeholderBelow',
  ],

  attributeBindings : [
    'draggable',
  ],




  // ----- Static properties -----
  draggable      : true,
  originalHeight : undefined,

  isCollapsed : false,

  shouldShowPlaceholderAbove2 : undefined,
  shouldShowPlaceholderBelow2 : undefined,



  // ----- Aliases -----
  isDragging   : reads('dragSort.isDragging'),
  isDraggingUp : reads('dragSort.isDraggingUp'),
  sourceIndex  : reads('dragSort.sourceIndex'),
  targetIndex  : reads('dragSort.targetIndex'),
  targetList   : reads('dragSort.targetList'),



  // ----- Computed properties -----
  isDragged : and(
    'isDragging',
    eq('items', 'sourceList'),
    eq('index', 'sourceIndex')
  ),

  isDraggingOver : and(
    'isDragging',
    eq('items', 'targetList'),
    eq('index', 'targetIndex'),
    not('isDragged')
  ),

  isLast                     : eq('index', subtract('items.length', 1)),
  shouldShowPlaceholderAbove : and('isDraggingOver', 'isDraggingUp'),
  shouldShowPlaceholderBelow : and('isDraggingOver', not('isDraggingUp')),
  // paddingTop                 : cond('shouldShowPlaceholderAbove', 'placeholderCssValue', 'noPlaceholderCssValue'),
  // paddingBottom              : cond('shouldShowPlaceholderBelow', 'placeholderCssValue', 'noPlaceholderCssValue'),




  // ----- Overridden methods -----
  dragStart (event) {
    event.stopPropagation()
    this.startDragging(event)
  },

  dragEnd (event) {
    event.stopPropagation()
    // console.log('dragEnd', event)
    this.endDragging(event)
  },

  dragOver (event) {
    event.stopPropagation()
    // console.log('dragOver')
    this.draggingOver(event)
  },

  dragEnter (event) {
    // Without this, dragOver would not fire in IE11. http://mereskin.github.io/dnd/
    event.preventDefault()
  },





  // ----- Custom methods -----
  startDragging (event) {
    // console.log('startDragging')

    // Required for Firefox. http://stackoverflow.com/a/32592759/901944
    event.dataTransfer.setData('text', 'anything')

    this.collapse()

    const item     = this.get('item')
    const index    = this.get('index')
    const items    = this.get('items')
    const group    = this.get('group')
    const dragSort = this.get('dragSort')

    dragSort.startDragging({item, index, items, group, event})
  },

  endDragging () {
    // console.log('endDragging')
    this.restore()

    const action   = this.get('dragEndAction')
    const dragSort = this.get('dragSort')

    dragSort.endDragging({action})
  },

  draggingOver (event) {
    const group       = this.get('group')
    const activeGroup = this.get('dragSort.group')
    if (group !== activeGroup) return


    const index        = this.get('index')
    const items        = this.get('items')
    const isDraggingUp = event.offsetY / this.$().innerHeight() < 0.5
    const dragSort     = this.get('dragSort')

   // console.log('draggingOver', {index, items: items.get('length'), isDraggingUp})

    dragSort.draggingOver({group, index, items, isDraggingUp})
  },

  collapse () {
    // The delay is necessary for HTML classes to update with a delay.
    // Otherwise, dragging is finished immediately.
    next(() => {
      if (this.get('isDestroying') || this.get('isDestroyed')) return
      this.set('isCollapsed', true)
    })
  },

  restore () {
    // The delay is necessary for HTML class to update with a delay.
    // Otherwise, dragging is finished immediately.
    next(() => {
      if (this.get('isDestroying') || this.get('isDestroyed')) return
      this.set('isCollapsed', false)
    })
  },



  // ----- Observers -----
  consumePlaceholderCPs : on('didInsertElement', function () {
    this.getProperties(
      'shouldShowPlaceholderAbove',
      'shouldShowPlaceholderBelow'
    )
  }),

  setPlaceholderrAbove : observer('shouldShowPlaceholderAbove', function () {
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

  setPlaceholderrBelow : observer('shouldShowPlaceholderBelow', function () {
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
