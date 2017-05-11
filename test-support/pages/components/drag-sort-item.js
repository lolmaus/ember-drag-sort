import component from './_component'
import trigger from 'ember-drag-sort/utils/trigger'



export default component({
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
