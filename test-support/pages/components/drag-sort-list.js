import component from './_component'
import dragSortItem from './drag-sort-item'
import trigger from 'ember-drag-sort/utils/trigger'
import {assert} from 'ember-metal/utils'
import RSVP from 'rsvp'

import {
  collection,
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

    dragEnter () {
      trigger(this.$, 'dragenter')
    },

    sort (sourceIndex, targetList, targetIndex, above) {
      assert(
        `the \`move\` method of \`dragSortList\` page object component accepts 3 or 4 arguments, but ${arguments.length} was given`,
        arguments.length === 3 || arguments.length === 4
      )

      if (arguments.length === 3) {
        targetIndex = targetList
        targetList = this
      }

      const draggedItem = this.items(sourceIndex)
      const targetItem  = targetList.items(targetIndex)

      draggedItem.dragStart()
      targetList.dragEnter()
      targetItem.dragOver(above)
      draggedItem.dragEnd()

      return new RSVP.Promise(resolve => setTimeout(resolve, 0))
    }
  })
}


export default dragSortList()
