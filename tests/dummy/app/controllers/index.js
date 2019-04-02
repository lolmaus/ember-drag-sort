import Controller from '@ember/controller'
import {A} from '@ember/array'

import { task, timeout } from 'ember-concurrency'
import RSVP from 'rsvp'
import { computed } from '@ember/object'



export default Controller.extend({

  items1 : computed(() =>
    A([
      {name : 'Foo'},
      {name : 'Bar'},
      {name : 'Baz'},
      {name : 'Quux'},
    ])
  ),

  items2 : computed(() =>
    A([
      {name : 'Zomg'},
      {name : 'Lol'},
    ])
  ),

  items3 : computed(() =>
    A([
      {name : 'Foo'},
      {name : 'Bar'},
      {name : 'Baz'},
      {name : 'Quux'},
    ])
  ),

  items4 : computed(() =>
    A([
      {name : 'Zomg'},
      {name : 'Lol'},
    ])
  ),

  items5 : computed(() =>
    A([
      {name : 'Bar'},
      {name : 'Baz'},
      {name : 'Foo'},
      {name : 'Quux'},
    ])
  ),

  items6 : computed(() =>
    A([
      {name : 'Zomg'},
      {name : 'Lol'},
    ])
  ),

  items7 : computed(() =>
    A([
      {name : 'Foo'},
      {name : 'Bar'},
      {name : 'Baz'},
    ])
  ),

  items8 : computed(() =>
    A()
  ),

  items9 : computed(() =>
    A()
  ),

  items10 : computed(() =>
    A([
      {name : 'Foo'},
      {name : 'Bar'},
      {name : 'Baz'},
      {name : 'Quux'},
    ])
  ),

  items11 : computed(() =>
    A([
      {name : 'Zomg'},
      {name : 'Lol'},
    ])
  ),

  nestedItem : computed(() => (
    {
      name     : 'Foo',
      children : A([
        {
          name     : 'Bar',
          children : A([
            {
              name     : 'Baz',
              children : A([]),
            },
            {
              name     : 'Quuz',
              children : A([]),
            },
          ]),
        },
        {
          name     : 'Zomg',
          children : A([]),
        },
        {
          name     : 'Lol',
          children : A([]),
        },
      ]),
    }
  )),

  networkFailure : false,

  actions : {
    dragEnd ({sourceList, sourceIndex, targetList, targetIndex}) {
      if (sourceList === targetList && sourceIndex === targetIndex) return

      const item = sourceList.objectAt(sourceIndex)

      sourceList.removeAt(sourceIndex)
      targetList.insertAt(targetIndex, item)
    },

    determineForeignPosition ({draggedItem, items}) {
      return A(items.slice()) // create a copy of the list
        .addObject(draggedItem)
        .sortBy('name')
        .indexOf(draggedItem)
    },

    dragEnd2 ({sourceList, sourceIndex, targetList, targetIndex}) {
      if (sourceList === targetList && sourceIndex === targetIndex) return

      const unsortableList = this.get('items7')

      let item = sourceList.objectAt(sourceIndex)

      if (sourceList === unsortableList) item = {...item} // shallow clone
      else sourceList.removeAt(sourceIndex)

      if (targetList !== unsortableList) targetList.insertAt(targetIndex, item)
    },

    determineForeignPosition2 ({/*draggedItem, */items}) {
      return items.length
    },
  },

  dragEndTask : task(function * ({sourceList, sourceIndex, targetList, targetIndex}) {
    if (sourceList === targetList && sourceIndex === targetIndex) return RSVP.resolve()

    const item = sourceList.objectAt(sourceIndex)

    sourceList.removeAt(sourceIndex)
    targetList.insertAt(targetIndex, item)

    yield timeout(2000)

    if (this.get('networkFailure')) {
      // Rollback
      targetList.removeAt(targetIndex)
      sourceList.insertAt(sourceIndex, item)

      return RSVP.reject({message : 'Request timed out.'})
    }

    return RSVP.resolve()
  }).drop(),
})
