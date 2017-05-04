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



  draggingOver ({group, index, items, isDraggingUp}) {
    // Ignore hovers over irrelevant groups
    if (group !== this.get('group')) return

    // Ignore hovers over irrelevant lists
    if (items !== this.get('targetList')) return

    // Remember current index and direction
    this.setProperties({
      targetIndex : index,
      isDraggingUp
    })
  },



  dragEntering ({group, items}) {
    // Ignore entering irrelevant groups
    if (group !== this.get('group')) return

    // Reset index when entering a new list
    if (items !== this.get('targetList')) {
      this.set('targetIndex', 0)
    }

    // Remember entering a new list
    this.set('targetList', items)
  },



  endDragging ({action}) {
    const sourceList   = this.get('sourceList')
    const sourceIndex  = this.get('sourceIndex')
    const targetList   = this.get('targetList')
    let   targetIndex  = this.get('targetIndex')
    const isDraggingUp = this.get('isDraggingUp')

    // Account for dragged item shifting indexes by one
    if (
      sourceList === targetList
      && targetIndex > sourceIndex
    ) targetIndex--

    // Account for dragging down
    if (
      // Dragging down
      !isDraggingUp

      // Target index is not after the last item
      && targetIndex < targetList.get('length')

      // The only element in target list is not the one dragged
      && !(
        targetList.get('length') === 1
        && targetList.get('firstObject') === targetList.objectAt(targetIndex)
      )
    ) targetIndex++

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
})
