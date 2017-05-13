import component from './_component'
import dragSortItem from './drag-sort-item'
import trigger, {sort} from 'ember-drag-sort/utils/trigger'
import {assert} from 'ember-metal/utils'

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

    sort (sourceIndex, targetList, targetIndex, above) {
      assert(
        `the \`sort\` method of \`dragSortList\` page object component accepts 3 or 4 arguments, but ${arguments.length} was given`,
        arguments.length === 3 || arguments.length === 4
      )

      if (arguments.length === 3) {
        above       = targetIndex
        targetIndex = targetList
        targetList  = this
      }

      return sort(this.$, sourceIndex, targetList.$, targetIndex, above)
    },
  })
}


export default dragSortList()
