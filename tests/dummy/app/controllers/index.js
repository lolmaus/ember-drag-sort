import Controller from 'ember-controller'
import {A} from 'ember-array/utils'

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

  actions : {
    dragEndAction ({sourceList, sourceIndex, targetList, targetIndex}) {
      const item = sourceList.objectAt(sourceIndex)

      sourceList.removeAt(sourceIndex)
      targetList.insertAt(targetIndex, item)
    }
  }
})
