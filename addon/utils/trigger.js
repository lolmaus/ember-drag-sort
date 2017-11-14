import {run} from '@ember/runloop'
import {assert} from '@ember/debug'

import $ from 'jquery'
import wait from 'ember-test-helpers/wait'



// https://github.com/jgwhite/ember-sortable/blob/21d2c513f96796f9b1a56983d34cf501a1f169c2/tests/integration/components/sortable-group-test.js#L35-L40
export function triggerEvent (elementOrSelector, eventName, params) {
  run(() => {
    const $el   = $(elementOrSelector)

    if (typeof params === 'function') params = params($el)

    const event = $.Event(eventName, params)

    $el.trigger(event)
  })
}



export default function trigger (elementOrSelector, eventName, isDraggingUp, target) {
  triggerEvent(elementOrSelector, eventName, $el => {
    const params = {target}

    if (isDraggingUp != null) {
      const modifier = isDraggingUp ? 0.25 : 0.75
      const inner    = $el.outerHeight() * modifier
      const outer    = $el.offset().top
      params.pageY   = inner + outer
    }

    return params
  })
}




export async function sort (sourceList, sourceIndex, targetIndex, above, handleSelector) {
  const $sourceList = $(sourceList)
  let   $sourceItem = $sourceList.children().eq(sourceIndex)
  const $targetItem = $sourceList.children().eq(targetIndex)

  if (handleSelector) $sourceItem = $sourceItem.find(handleSelector)

  assert(
    `[ember-drag-sort sort helper] no item exists in the list at target index ${targetIndex}`,
    $targetItem.length
  )

  trigger($sourceItem, 'dragstart')
  trigger($targetItem, 'dragover', above)
  trigger($sourceItem, 'dragend')

  return wait()
}




export async function move (sourceList, sourceIndex, targetList, targetIndex, above, handleSelector) {
  const $sourceList      = $(sourceList)
  let   $sourceItem      = $sourceList.children().eq(sourceIndex)
  const $targetList      = $(targetList)
  const targetListLength = $targetList.children().length

  if (handleSelector) $sourceItem = $sourceItem.find(handleSelector)

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

  return wait()
}
