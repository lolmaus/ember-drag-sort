// ----- Ember modules -----
import Component from 'ember-component'
import service from 'ember-service/inject'
import {reads} from 'ember-computed'
import on from 'ember-evented/on'
import observer from 'ember-metal/observer'
import {next} from 'ember-runloop'

// ----- Ember addons -----
import computed from 'ember-macro-helpers/computed'
import and from 'ember-awesome-macros/and'
import not from 'ember-awesome-macros/not'
// import or from 'ember-awesome-macros/or'
import eq from 'ember-awesome-macros/eq'
import cond from 'ember-awesome-macros/conditional'
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
  ],

  attributeBindings : [
    'draggable',
  ],




  // ----- Static properties -----
  draggable      : true,
  originalHeight : undefined,



  // ----- Aliases -----
  isDragging       : reads('dragSort.isDragging'),
  isDraggingUp     : reads('dragSort.isDraggingUp'),
  draggedItem      : reads('dragSort.draggedItem'),
  sourceIndex      : reads('dragSort.sourceIndex'),
  targetIndex      : reads('dragSort.targetIndex'),
  targetList       : reads('dragSort.targetList'),
  previousPointerY : reads('dragSort.previousPointerY'),



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
  paddingTop                 : cond('shouldShowPlaceholderAbove', 'placeholderCssValue', 'noPlaceholderCssValue'),
  paddingBottom              : cond('shouldShowPlaceholderBelow', 'placeholderCssValue', 'noPlaceholderCssValue'),




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





  // ----- Custom methods -----
  startDragging (event) {

    this.collapse()

    const item     = this.get('item')
    const index    = this.get('index')
    const items    = this.get('items')
    const group    = this.get('group')
    const dragSort = this.get('dragSort')

    dragSort.startDragging({item, index, items, group, event})
  },

  endDragging () {
    this.restore()

    const action   = this.get('dragEndAction')
    const dragSort = this.get('dragSort')

    dragSort.endDragging({action})
  },

  draggingOver (event) {
    // console.log('dragOver',  this.get('isDraggingUp') ? 'above' : 'below', this.get('index'),)
    const group       = this.get('group')
    const activeGroup = this.get('dragSort.group')
    if (group !== activeGroup) return

    const index    = this.get('index')
    const items    = this.get('items')
    const dragSort = this.get('dragSort')

    dragSort.draggingOver({group, index, items, event})
  },

  collapse () {
    // this.set('originalHeight', this.$().outerHeight())
    // this.$().css({overflow : 'hidden'})
    //
    // this.$().animate({height : 0}, {complete : () => {
    //   if (this.get('isDestroying') || this.get('isDestroyed')) return
    //   this.$().css({display : 'none'})
    // }})

    next(() => {
      this.$().css({display : 'none'})
    })
  },

  restore () {
    // const height = this.get('originalHeight')
    next(() => {
      if (this.get('isDestroying') || this.get('isDestroyed')) return
      this.$().css({display : ''})
    })
    // this.$().animate({height},u {complete : () => {
    //   if (this.get('isDestroying') || this.get('isDestroyed')) return
    //   this.$().css({height : '', overflow : ''})
    // }})
  },



  // ----- Observers -----
  consumePaddingCPs : on('didInsertElement', function () {
    this.getProperties('paddingTop', 'paddingBottom')
  }),

  setPaddingTop : observer('paddingTop', function () {
    next(() => {
      if (this.get('isDestroying') || this.get('isDestroyed')) return
      this.$().css({paddingTop : this.get('paddingTop')})
    })
  }),

  setPaddingBottom : observer('paddingBottom', function () {
    next(() => {
      if (this.get('isDestroying') || this.get('isDestroyed')) return
      this.$().css({paddingBottom : this.get('paddingBottom')})
    })
  }),
})
