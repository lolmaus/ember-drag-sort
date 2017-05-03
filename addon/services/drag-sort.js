// ----- Ember modules -----
import Service from 'ember-service'



export default Service.extend({

  // ----- Static properties -----
  isDragging       : false,
  isDraggingUp     : null,
  previousPointerY : null,

  draggedItem : null,
  group       : null,

  sourceList  : null,
  targetList  : null,
  sourceIndex : null,
  targetIndex : null,



  // ----- Custom methods -----
  startDragging ({item, index, items, group, event: {clientY}}) {
    // console.log('startDragging', item, index, event)

    this.setProperties({
      isDragging       : true,
      isDraggingUp     : false,
      previousPointerY : clientY,

      draggedItem : item,
      group,

      sourceList  : items,
      targetList  : items,
      sourceIndex : index,
      targetIndex : index - 1,
    })
  },

  draggingOver ({group, index, items, event: {clientY}}) {
    if (group !== this.get('group')) return
    if (items !== this.get('targetList')) return

    const previousPointerY = this.get('previousPointerY')

    if      (clientY < previousPointerY) this.set('isDraggingUp', true)
    else if (clientY > previousPointerY) this.set('isDraggingUp', false)

    this.setProperties({
      targetIndex      : index,
      previousPointerY : clientY,
    })
  },

  dragEntering ({group, items}) {
    if (group !== this.get('group')) return

    console.log('dragEntering', items.length)

    this.setProperties({
      targetList  : items,
      targetIndex : 0,
    })
  },

  endDragging ({action}) {
    const sourceList   = this.get('sourceList')
    const sourceIndex  = this.get('sourceIndex')
    const targetList   = this.get('targetList')
    let   targetIndex  = this.get('targetIndex')
    const isDraggingUp = this.get('isDraggingUp')

    if (
      sourceList === targetList
      && targetIndex > sourceIndex
    ) targetIndex--

    if (
      !isDraggingUp
      && targetIndex < targetList.get('length')

      // The only element in target list is not the one dragged
      && !(
        targetList.get('length') === 1
        && targetList.get('firstObject') === targetList.objectAt(targetIndex)
      )
    ) targetIndex++

    console.log('finish', {
      sourceList,
      sourceIndex,
      targetList,
      targetIndex
    })

    this._reset()

    if (typeof action !== 'function') return

    action({
      sourceList,
      sourceIndex,
      targetList,
      targetIndex
    })
  },

  _reset () {
    this.setProperties({
      isDragging       : false,
      isDraggingUp     : null,
      previousPointerY : null,

      draggedItem : null,
      group       : null,

      sourceList  : null,
      targetList  : null,
      sourceIndex : null,
      targetIndex : null,
    })
  },

  asdf: Ember.observer('targetIndex', function () {
    console.log({targetIndex: this.get('targetIndex')})
  })
})
