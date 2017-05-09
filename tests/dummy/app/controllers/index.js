import Controller from 'ember-controller'
import {A} from 'ember-array/utils'
import { task, timeout } from 'ember-concurrency'

export default Controller.extend({

  items1 : A([
    {name : 'Foo'},
    {name : 'Bar'},
    {name : 'Baz'},
    {name : 'Quux'},
  ]),

  items2 : A([
    {name : 'Zomg'},
    {name : 'Lol'},
  ]),

  items3 : A([
    {name : 'Foo'},
    {name : 'Bar'},
    {name : 'Baz'},
    {name : 'Quux'},
  ]),

  items4 : A([
    {name : 'Zomg'},
    {name : 'Lol'},
  ]),

  nestedItem : {
    name     : 'Foo',
    children : A([
      {
        name     : 'Bar',
        children : A([
          {
            name     : 'Baz',
            children : A([])
          },
          {
            name     : 'Quuz',
            children : A([])
          },
        ])
      },
      {
        name     : 'Zomg',
        children : A([])
      },
      {
        name     : 'Lol',
        children : A([])
      },
    ]),
  },

  networkFailure : false,

  actions : {
    dragEndAction ({sourceList, sourceIndex, targetList, targetIndex}) {
      const item = sourceList.objectAt(sourceIndex)

      sourceList.removeAt(sourceIndex)
      targetList.insertAt(targetIndex, item)
    },
  },

  dragEndTask : task(function * ({sourceList, sourceIndex, targetList, targetIndex}) {
    const item = sourceList.objectAt(sourceIndex)

    sourceList.removeAt(sourceIndex)
    targetList.insertAt(targetIndex, item)

    yield timeout(2000)

    if (this.get('networkFailure')) {
      // Rollback
      targetList.removeAt(targetIndex)
      sourceList.insertAt(sourceIndex, item)
    }
  }).drop(),
})
