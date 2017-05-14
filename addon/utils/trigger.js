import run, {next}  from 'ember-runloop'
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




export function sort (sourceList, sourceIndex, targetIndex, above) {
  const $sourceList = $(sourceList)
  const $sourceItem = $sourceList.children().eq(sourceIndex)
  const $targetItem = $sourceList.children().eq(targetIndex)

  assert(
    `[ember-drag-sort sort helper] no item exists in the list at target index ${targetIndex}`,
    $targetItem.length
  )

  trigger($sourceItem, 'dragstart')
  trigger($targetItem, 'dragover', above)
  trigger($sourceItem, 'dragend')

  return new RSVP.Promise(resolve => next(resolve))
}




export function move (sourceList, sourceIndex, targetList, targetIndex, above) {
  const $sourceList      = $(sourceList)
  const $sourceItem      = $sourceList.children().eq(sourceIndex)
  const $targetList      = $(targetList)
  const targetListLength = $targetList.children().length

  if ($targetList.children().length) {
    if (targetIndex == null) {
      targetIndex = targetListLength - 1
      above       = false
    }

    const $targetItem = $targetList.children().eq(targetIndex)

    assert(
        `[ember-drag-sort move helper] no item exists in target list at target index ${targetIndex}`,
        $targetItem.length
      )

    trigger($sourceItem, 'dragstart')
    trigger($targetList, 'dragenter')
    trigger($targetItem, 'dragover', above)
    trigger($sourceItem, 'dragend')
  } else {
    assert(
        `[ember-drag-sort move helper] target list is empty, the only available target index is 0, but target index ${targetIndex} was provided`,
        !targetIndex
      )

    trigger($sourceItem, 'dragstart')
    trigger($targetList, 'dragenter')
    trigger($sourceItem, 'dragend')
  }

  return new RSVP.Promise(resolve => next(resolve))
}
