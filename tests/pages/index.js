import {
  collection,
  create,
  text,
  visitable,
} from 'ember-cli-page-object'

import {dragSortList} from 'dummy/tests/pages/components/drag-sort-list'



export default create({
  visit      : visitable('/'),
  listGroups : collection({
    scope     : '.list-groups',
    itemScope : '.list-group',
    item      : {
      lists : collection({
        itemScope : '.dragSortList',
        item      : dragSortList({
          title : text(),
        }),
      }),
    },
  }),
})
