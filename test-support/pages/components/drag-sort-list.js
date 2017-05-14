import component from './_component'
import dragSortItem from './drag-sort-item'
import trigger, {sort, move} from 'ember-drag-sort/utils/trigger'

import {
  collection,
  hasClass,
} from 'ember-cli-page-object'



export function dragSortList (content = {}) {
  return component({
    items : collection({
      itemScope : '> .dragSortItem',
      item      : {
        ...dragSortItem,
        content
      }
    }),

    draggingEnabled : hasClass('-draggingEnabled'),
    isDragging      : hasClass('-isDragging'),
    isDraggingOver  : hasClass('-isDraggingOver'),
    isEmpty         : hasClass('-isEmpty'),
    isExpanded      : hasClass('-isExpanded'),

    dragEnter () {
      trigger(this.$, 'dragenter')
    },

    sort (sourceIndex, targetIndex, above) {
      return sort(this.$, sourceIndex, targetIndex, above)
    },

    move (sourceIndex, targetList, targetIndex, above) {
      return move(this.$, sourceIndex, targetList.$, targetIndex, above)
    },
  })
}


export default dragSortList()
