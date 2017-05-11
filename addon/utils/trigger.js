import run from 'ember-runloop'
import $ from 'jquery'


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
