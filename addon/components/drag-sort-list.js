// ----- Ember modules -----
import Component from 'ember-component'
import service from 'ember-service/inject'
import {reads} from 'ember-computed'
import observer from 'ember-metal/observer'
import {next} from 'ember-runloop'

// ----- Ember addons -----
// import computed from 'ember-macro-helpers/computed'
import and from 'ember-awesome-macros/and'
import or from 'ember-awesome-macros/or'
import eq from 'ember-awesome-macros/eq'

// ----- Own modules -----
import layout from '../templates/components/drag-sort-list'



export default Component.extend({

  // ----- Arguments -----
  items                 : undefined,
  group                 : undefined,
  childClass            : '',
  draggingEnabled       : true,
  placeholderCssValue   : '10px',
  noPlaceholderCssValue : '0',
  dragEndAction         : undefined,



  // ----- Services -----
  dragSort : service(),



  // ----- Overridden properties -----
  layout,
  classNameBindings : [
    ':dragSortList',
    'isDragging:-isDragging',
    'isDraggingOver:-isDraggingOver',
    'isExpanded2:-isExpanded',
    'isEmpty:-isEmpty',
  ],



  // ----- Static properties -----



  // ----- Aliases -----
  sourceList  : reads('dragSort.sourceList'),
  targetList  : reads('dragSort.targetList'),
  sourceIndex : reads('dragSort.sourceIndex'),



  // ----- Computed properties -----
  isDragging : and(
    'dragSort.isDragging',
    eq('group', 'dragSort.group')
  ),

  isDraggingOver : and(
    'isDragging',
    eq('items', 'targetList'),
  ),

  isExpanded : and(
    'isDragging',
    or('isEmpty', 'isOnlyElementDragged')
  ),

  isExpanded2 : reads('isExpanded'),

  isEmpty : eq('items.length', 0),

  isOnlyElementDragged : and(
    eq('items.length', 1),
    eq('items', 'sourceList'),
    eq('sourceIndex', 0)
  ),



  // ----- Overridden methods -----
  dragEnter (event) {
    this.dragEntering(event)
  },


  // ----- Custom methods -----
  dragEntering (event) {
    // Ignore irrelevant drags
    if (!this.get('dragSort.isDragging')) return

    // Ignore irrelevant groups
    const group       = this.get('group')
    const activeGroup = this.get('dragSort.group')
    if (group !== activeGroup) return

    event.stopPropagation()

    const items    = this.get('items')
    const dragSort = this.get('dragSort')

    dragSort.dragEntering({group, items})
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
