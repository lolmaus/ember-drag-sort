import run from 'ember-runloop'
import $ from 'jquery'
import {assert} from 'ember-metal/utils'
import RSVP from 'rsvp'


// https://github.com/jgwhite/ember-sortable/blob/21d2c513f96796f9b1a56983d34cf501a1f169c2/tests/integration/components/sortable-group-test.js#L35-L40
export function triggerEvent (elementOrSelector, eventName, params) {
  run(() => {
    const $el   = $(elementOrSelector)

    if (typeof params === 'function') params = params($el)

    const event = $.Event(eventName, params)

    $el.trigger(event)
  })
}



export default function trigger (elementOrSelector, eventName, isDraggingUp) {
  triggerEvent(elementOrSelector, eventName, $el => {
    if (isDraggingUp == null) return {}

    const modifier = isDraggingUp ? 0.25 : 0.75
    const inner    = $el.outerHeight() * modifier
    const outer    = $el.offset().top
    const pageY    = inner + outer

    return {pageY}
  })
}




export function sort (sourceList, sourceIndex, targetList, targetIndex, above) {
  assert(
    `the \`sort\` helper accepts 4 or 5 arguments, but ${arguments.length} was given`,
    arguments.length === 4 || arguments.length === 5
  )

  if (arguments.length === 4) {
    above       = targetIndex
    targetIndex = targetList
    targetList  = sourceList
  }

  const $sourceList = $(sourceList)
  const $sourceItem = $sourceList.children().eq(sourceIndex)
  const $targetList = $(targetList)
  const $targetItem = $targetList.children().eq(targetIndex)

  trigger($sourceItem, 'dragstart')
  trigger($targetList, 'dragenter')
  trigger($targetItem, 'dragover', above)
  trigger($sourceItem, 'dragend', above)

  return new RSVP.Promise(resolve => setTimeout(resolve, 0))
}
