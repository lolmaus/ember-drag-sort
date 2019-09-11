import Component from '@ember/component'
import layout from '../templates/components/nested-item'



export default Component.extend({
  layout,
  classNames        : ['nestedItem'],
  classNameBindings : [
    'isHorizontal:-horizontal',
  ],

  item          : undefined,
  dragEndAction : undefined,
  isHorizontal  : false,
  group         : 'nested group',
})
