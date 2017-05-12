import {
  attribute,
  hasClass,
} from '../../page-object'

import component from './_component'
import trigger from 'ember-drag-sort/utils/trigger'



export default component({
  draggable : attribute('draggable'),

  isDragged        : hasClass('-isDragged'),
  isDraggingOver   : hasClass('-isDraggingOver'),
  placeholderAbove : hasClass('-placeholderAbove'),
  placeholderBelow : hasClass('-placeholderBelow'),

  dragStart (index) {
    trigger(this.$, 'dragstart')
  },

  dragOver (above) {
    trigger(this.$, 'dragover', above)
  },

  dragEnd () {
    trigger(this.$, 'dragend')
  },
})
