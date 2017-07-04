# ember-drag-sort

[![Travis build status](https://img.shields.io/travis/Deveo/ember-drag-sort.svg)](https://travis-ci.org/Deveo/ember-drag-sort)
[![Ember Observer Score](http://emberobserver.com/badges/ember-drag-sort.svg?cache_bust=1)](http://emberobserver.com/addons/ember-drag-sort)
[![npm package version](https://img.shields.io/npm/v/ember-drag-sort.svg)](https://www.npmjs.com/package/ember-drag-sort)
[![license MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/Deveo/ember-drag-sort/blob/gen-1/LICENSE.md)
![ember-versions 1.13+](https://img.shields.io/badge/ember--versions-1.13%2B-yellowgreen.svg)
![node-versions 4+](https://img.shields.io/badge/node--versions-4%2B-yellowgreen.svg)
![ember-cli 2.13.1](https://img.shields.io/badge/uses%20ember--cli-2.11.1-blue.svg)



* [About](#about)
  * [Features](#features)
  * [Planned features](#planned-features)
  * [Browser support](#browser-support)
* [Installation](#installation)
* [Usage](#usage)
  * [Basic usage](#basic-usage)
  * [The drag end action](#the-drag-end-action)
  * [The determine foreign position action](#the-determine-foreign-position-action)
  * [drag-sort-list arguments reference](#drag-sort-list-arguments-reference)
  * [HTML classes](#html-classes)
  * [CSS concerns](#css-concerns)
  * [Events](#events)
* [Test helpers](#test-helpers)
  * [trigger](#trigger)
  * [sort](#sort)
  * [move](#move)
  * [Page object components](#page-object-components)
    * [Sorting the dragSortList page object component](#sorting-the-dragsortlist-page-object-component)
* [Development](#development)
  * [Do not use npm, use yarn](#do-not-use-npm-use-yarn)
  * [Installation for development](#installation-for-development)
  * [Running](#running)
  * [Branch names](#branch-names)
  * [Updating the table of contents](#updating-the-table-of-contents)
  * [Demo deployment](#demo-deployment)
* [Credits](#credits)
* [License](#license)




## About

A drag'n'drop sortable list addon.


### Features

* Dragging between lists.
* Nested lists (tree-like structures).
* Strict DDAU: does not mutate the lists while dragging. On drag end, calls an action for you to handle list mutation.



### Planned features

Not in active development. PRs welcome!

* Drag handle.
* Support for horizontal lists.



### Browser support

Tested manually.

Works in desktop browsers:

* IE 10
* IE 11
* Edge
* Chrome
* Firefox
* Safari

Does not work on mobile browsers:

* Safari/iOS: does not support drag'n'drop.
* Firefox/Android: does not support drag'n'drop.
* Chrome/Android: for some reason, does not fire the `dragend` event. Currently, the addon behaves incorrectly on Chrome/Android. If your webapp offers mobile experience, you must manually detect Chrome/Android and disable dragging.



## Installation

    ember install ember-drag-sort



## Usage

### Basic usage

The `drag-sort-list` component accepts two mandatory arguments:

* `items` -- the array of items to sort. *Must* be an Ember array (normally, all arrays in an Ember app are Ember arrays).
* `dragEndAction` -- a closure action that should update elements when sort is complete.

The component accepts a block representing an individual item (the block is rendered multiple times, one per list item). It yields `item` and `index`.

```handlebars
{{#drag-sort-list
  items         = items1
  dragEndAction = (action 'dragEnd')
  as |item|
}}
  {{item.name}}
{{/drag-sort-list}}
```

### The drag end action

It is called on the source list component when the drag'n'drop operation is complete. It's called with a single argument -- an object with the following properties:

| Property      | Type   | Description                                                            |
|:--------------|:-------|:-----------------------------------------------------------------------|
| `group`       | String | Group provided to the `drag-sort-list` component.                      |
| `draggedItem` | <any>  | The list item being dragged.                                           |
| `sourceList`  | Array  | The list where the sorting was initiated.                              |
| `sourceIndex` | Number | The initial index of the item in the source list.                      |
| `targetList`  | Array  | The list where sorting was finished. Will be the same as `sourceList`. |
| `targetIndex` | Number | The resulting index of the dragged item in the target list.            |

When sorting within one list, `targetIndex` assumes that the dragged item is not in the list.

> For example, when your list is `['a', 'b', 'c']` and you put `b` after `c`, `sourceIndex` will be `1` and `targetIndex` will be `2`. The initial index of `c` was `2`, so you could suppose that target index after `c` is `3`.
> 
> But `targetIndex` is calculated as if the dragged item `b` is not in the list: `['a', 'c']`. Thus, next index after `c` will be `2`.
>
> This is because the array has three items with indexes `0`, `1` and `2`, so putting an item to position `3` would make no sense. 

Here's the reference implementation of the `dragEndAction` action:

```js
  actions: {
    dragEndAction ({sourceList, sourceIndex, targetList, targetIndex}) {
      if (sourceList === targetList && sourceIndex === targetIndex) return

      const item = sourceList.objectAt(sourceIndex)

      sourceList.removeAt(sourceIndex)
      targetList.insertAt(targetIndex, item)
    }
  }
```

The `dragEndAction` action *must* be a closure action.

Correct:

    dragEndAction = (action 'dragEnd')
   
Incorrect:

    dragEndAction = 'dragEnd'



### The determine foreign position action

You may want to let the user drag items in and out of a list, without letting him rearrange items within a list. In that case the order of items is determined by the app.

Here's a use case. Your CMS allows the admin to put widgets in page areas. The admin panel has a number of lists representing page header, sidebar, footer, etc. The admin is allowed to rearrange widgets to his liking. And there's a list of unused widgets, the admin can drag items to and from that list, but unused items should always be sorted alphabetically.

To achieve that, pass a closure action `determineForeignPositionAction` into the list of unused items. This will prevent the user from sorting items in that list.

When the user drags a foreign items into such a list, the action will be called to determine the position of the item. Essentially, by running that action the `ember-drag-sort` addon asks the host app to suggest desired position of the dragged item.

The action is only called for foreign items. When the user drags an item out of the unsortable list but then drags the item back, it will appear on its original position.

The `determineForeignPositionAction` is called with with a single argument -- an object with the following properties:

| Property      | Type  | Description                                   |
|:--------------|:------|:----------------------------------------------|
| `draggedItem` |       | The item being dragged.                       |
| `items`       | Array | The list where the item should be positioned. |

This action must return an **integer** -- the desired position of the item.

The simplest implementation is to always put the item into the end of the list:

```js
determineForeignPosition ({/* draggedItem,  */items}) {
  return items.length
}
```

To sort items alphabetically, you  can use lodash:

```js
determineForeignPosition ({draggedItem, items}) {
  return _.sortedIndex(items.toArray(), draggedItem)
}
```

Or do it by hand:

```js
determineForeignPosition ({draggedItem, items}) {
  items = A(items.slice()) // make sure not to mutate the list!
  items.addObject(draggedItem)
  items = items.sortBy('name')
  return items.indexOf(draggedItem)
}
```

**`determineForeignPositionAction` must not actually sort the list**. It's only purpose is to suggest desired item position, which is necessary to display the placeholder.

**`determineForeignPositionAction` must passed as a closure action**.

Correct:

    determineForeignPositionAction = (action 'determineForeignPosition')
   
Incorrect:

    determineForeignPositionAction = 'determineForeignPosition'




### drag-sort-list arguments reference

| Argument                         | Type                          | Default value | Description                                                                                                                                                                                     |
|:---------------------------------|:------------------------------|:--------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `items`                          | Ember Array                   | <required>    | An array of items to display and offer sorting.                                                                                                                                                 |
| `dragEndAction`                  | Closure action                | <required>    | This callback will be called on source list when sorting is complete. See above for details.                                                                                                    |
| `determineForeignPositionAction` | Closure action or `undefined` | `undefined`   | When provided, used to determine the position of the placeholder when dragging a foreign item into the list. When not provided, the user is able to determine the order. See above for details. |
| `group`                          | <any>                         | `undefined`   | Used to restrict dragging between multiple lists to only some of those lists. Typically a string.                                                                                               |
| `draggingEnabled`                | Boolean                       | `true`        | Disables sorting. Useful when `dragEndAction` is an async operation.                                                                                                                            |
| `childClass`                     | String                        | `""`          | HTML class applied to list item components.                                                                                                                                                     |
| `childTagName`                   | String                        | `"div"`       | `tagName` applied to list item components.                                                                                                                                                      |



### HTML classes

`drag-sort-list` component has HTML class `dragSortList`. It also assumes the following classes dynamically:

| HTML class         | Applied when...                                                                                                                                                                   |
|:-------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `-isEmpty`         | The given list is empty.                                                                                                                                                          |
| `-draggingEnabled` | Dragging is enabled via the `draggingEnabled` attribute.                                                                                                                         |
| `-isDragging`      | Dragging is in progress and the given list is either a source list or belongs to the same group as the source list.                                                               |
| `-isDraggingOver`  | Dragging is in progress and the placeholder is within the given list. This class is removed from a list when an item is dragged into a different list.                            |
| `-isExpanded`      | Dragging is in progress and the given list is either empty or contains only the dragged item. Used to give some height to the list, so that the item can be dragged back into it. |

The individual item component has HTML class `dragSortItem`. It also assumes the following classes dynamically:


| HTML class          | Applied when...                                                               |
|:--------------------|:------------------------------------------------------------------------------|
| `-isDragged`        | The given item is the one being dragged. Used to hide the item from the list. |
| `-isDraggingOver`   | Dragged item is positioned either above or below the given item.              |
| `-placeholderAbove` | Dragged item is positioned above the given item.                              |
| `-placeholderBelow` | Dragged item is positioned below the given item.                              |



### CSS concerns

When dragging, the dragged item is hidden via the `-isDragged` HTML class that applies `display: none`.

The placeholder (drop target) is shown via the `-placeholderAbove` or `-placeholderBelow` HTML classes. These classes apply padding to the given list item, and the placeholder is an absolutely positioned `:before` pseudo-element. A similar pseudo-element is applied to an `-isExpanded` list (see above).

For sorting to work correctly, you must not apply padding to the list HTML element. If you need some padding on the list, apply it to its parent element.

You must not apply any padding or margin to list item elements either. If you need padding between list items, apply it to HTML elements that you pass into list items.



### Events

There's an Ember service called `dragSort`. You can listen to the following events on it, using the [Evented API](https://www.emberjs.com/api/classes/Ember.Evented.html).

Each event is called with as single argument, which is an object with properties. For the description of properties, see `dragEndAction` documentation above.

| Event name | Description                                                                        | Argument properties                                                                                   |
|:-----------|:-----------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------|
| `start`    | Sorting has started.                                                               | `group`, `draggedItem`, `sourceList`, `sourceIndex`                                                   |
| `sort`     | Dragged item has been moved within a list. The list is referenced as `targetList`. | `group`, `draggedItem`, `sourceList`, `sourceIndex`, `targetList`, `oldTargetIndex`, `newTargetIndex` |
| `move`     | Item has been dragged into a different list.                                       | `group`, `draggedItem`, `sourceList`, `sourceIndex`, `oldTargetList`, `newTargetList`, `targetIndex`  |
| `end`      | Sorting has ended.                                                                 | `group`, `draggedItem`, `sourceList`, `sourceIndex`, `targetList`, `targetIndex`  |



## Test helpers

### trigger

`trigger` is a low-level test helper that can be imported like this:

```js
import trigger from 'ember-drag-sort/utils/trigger'
```

It accepts three arguments:

| Argument    | Type                                     | Description                                                                                    |
|:------------|:-----------------------------------------|:-----------------------------------------------------------------------------------------------|
| `element`   | String, DOM element or jQuery collection | Selector or element to trigger an operation on.                                                |
| `eventName` | String                                   | For list: `dragenter`; for list item: `dragstart`, `dragover` or `dragend`.                    |
| `above`     | Boolean                                  | Only for `dragover`. Whether to put placeholder above (`true`) or below (`false`) target item. |

The order of operations is the following:

1. `dragstart` on the element to drag.
2. `dragenter` on target list that the dragged element should be moved into (optional).
3. `dragover` on target element, the one that the dragged element should be dropped next to. Provide third argument to indicate above or below.
4. `dragover` on the dragged element.

After performing the operations, you must [wait for async behavior](https://guides.emberjs.com/v2.13.0/testing/testing-components/#toc_waiting-on-asynchronous-behavior).
 
See this addon's integration test for example.



### sort

`sort` is a high-level test helper that **moves an item to a new position within the same list**.
 
It can be imported like this:

```js
import {sort} from 'ember-drag-sort/utils/trigger'
```

It accepts the following arguments:

| Argument      | Type                                     | Required? | Description                                                                                                                     |
|:--------------|:-----------------------------------------|:----------|:--------------------------------------------------------------------------------------------------------------------------------|
| `sourceList`  | String, DOM element or jQuery collection | yes       | Selector or element of the `drag-sort-list` component.                                                                          |
| `sourceIndex` | Integer                                  | yes       | Zero-based index of the item to pick up.                                                                                        |
| `targetIndex` | Integer                                  | yes       | Zero-based index of the item to drop picked item on top of, calculated while the picked item is still on its original position. |
| `above`       | Boolean                                  | yes       | Whether to drop picked item above (`true`) or below (`false`) target item.                                                      |

After executing `sort` in a test, perform a wait using `wait`, `andThen` or `await`.

Example:

```js
import {sort} from 'ember-drag-sort/utils/trigger'

test('sorting a list', async function (assert) {
  await visit('/')
  
  const $list = $('.dragSortList')
  
  await sort($list, 0, 1, false)

  const expectedTitles = ['Bar', 'Foo', 'Baz', 'Quux']

  assert.equal($list.children().length, 4)

  expectedTitles.forEach((expectedTitle, k) => {
    m = `List #0 item #${k} content title`
    expect($list.children().eq(k).text(), m).equal(expectedTitle)
  })
}))
```


### move

`move` is a high-level test helper that **moves an item from one list into another**.
 
It can be imported like this:

```js
import {sort} from 'ember-drag-sort/utils/trigger'
```

It accepts the following arguments:

| Argument      | Type                                     | Required?                       | Description                                                                                                                                                                                                                                |
|:--------------|:-----------------------------------------|:--------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sourceList`  | String, DOM element or jQuery collection | yes                             | Selector or element of the source `drag-sort-list` component.                                                                                                                                                                              |
| `sourceIndex` | Integer                                  | yes                             | Zero-based index of the item to pick up.                                                                                                                                                                                                   |
| `targetList`  | String, DOM element or jQuery collection | yes                             | Selector or element of the target `drag-sort-list` component.                                                                                                                                                                              |
| `targetIndex` | Integer                                  | no                              | Zero-based index of the item to drop picked item on top of, calculated while the picked item is still on its original position. When omitted, adds item to the end of the target list. **Must** be omitted when moving into an empty list. |
| `above`       | Boolean                                  | yes if `targetList` is provided | Whether to drop picked item above (`true`) or below (`false`) target item.                                                                                                                                                                 |

After executing `sort`, perform a wait using `wait`, `andThen` or `await`.

Example:

```js  
  const $list0 = $('.dragSortList').eq(0)
  const $list1 = $('.dragSortList').eq(1)
  
  await move($list0, 0, $list1, 1, false)
```

This will pick the first item from `$list0` and drop it below the second item of `$list1`.

See this addon's acceptance test for example.





### Page object components

This addon provides [page object](http://ember-cli-page-object.js.org) components, mixed into your app's `tests/pages/components/` directory:

```
import dragSortList from '<your-app-name>/tests/pages/components/drag-sort-list'
import dragSortItem from '<your-app-name>/tests/pages/components/drag-sort-item'
```

Normally, you only need to import `dragSortList`. `dragSortItem` is available as part of `dragSortList`.

When used in a test, **the `dragSortList` page object component offers the following properties and methods**:

| Property          | Type                                                                                     | Description                                                       |
|:------------------|:-----------------------------------------------------------------------------------------|:------------------------------------------------------------------|
| `items`           | [Page Object Collection](http://ember-cli-page-object.js.org/docs/v1.8.x/api/collection) | Each item is a `dragSortItem` page object component.              |
| `draggingEnabled` | Boolean                                                                                  | Checks for `-draggingEnabled` class on the component (see above). |
| `isDragging`      | Boolean                                                                                  | Checks for `-isDragging` class on the component (see above).      |
| `isDraggingOver`  | Boolean                                                                                  | Checks for `-isDraggingOver` class on the component (see above).  |
| `isEmpty`         | Boolean                                                                                  | Checks for `-isEmpty` class on the component (see above).         |
| `isExpanded`      | Boolean                                                                                  | Checks for `-isExpanded` class on the component (see above).      |
| `dragEnter()`     | Method                                                                                   | Calls `trigger` helper on current list with `'dragenter'`.        |
| `sort(...)`       | Method                                                                                   | Calls `sort` helper on current list. See below for arguments.     |
| `move(...)`       | Method                                                                                   | Calls `move` helper on current list. See below for arguments.     |


**The `dragSortItem` page object component offers the following properties and methods**:

| Property           | Type                  | Description                                                                                                    |
|:-------------------|:----------------------|:---------------------------------------------------------------------------------------------------------------|
| `content`          | Page Object Component | Represents the content of every `dragSortItem`. Available only via the factory imported from `{dragSortList}`. |
| `draggable`        | Boolean               | Whether the item is draggable                                                                                  |
| `isDragged`        | Boolean               | Checks for `-isDragged` class on the component (see above).                                                    |
| `isDraggingOver`   | Boolean               | Checks for `-isDraggingOver` class on the component (see above).                                               |
| `placeholderAbove` | Boolean               | Checks for `-placeholderAbove` class on the component (see above).                                             |
| `placeholderBelow` | Boolean               | Checks for `-placeholderBelow` class on the component (see above).                                             |
| `dragStart()`      | Method                | Calls `trigger` helper on current item with `'dragstart'`.                                                     |
| `dragOver(above)`  | Method                | Calls `trigger` helper on current item with `'dragover'` and `above`.                                          |
| `dragEnd()`        | Method                | Calls `trigger` helper on current item with `'dragend'`.                                                       |

Additionally, **both page object components offer the following properties and methods**:

| Property                      | Type              | Description                                                                                                                               |
|:------------------------------|:------------------|:------------------------------------------------------------------------------------------------------------------------------------------|
| `$`                           | jQuery Collection | Current element wrapped in jQuery.                                                                                                        |
| `empty`                       | Boolean           | Whether current element is empty, ignoring whitespace.                                                                                    |
| `exists`                      | Boolean           | Whether current element exists. When element does not exist, returns `false` without raising an exception.                                |
| `index`                       | Integer           | Index of current element within its parent.                                                                                               |
| `visible`                     | Boolean           | [PageObject.isVisible](http://ember-cli-page-object.js.org/docs/v1.8.x/api/isVisible).                                                    |
| `attr(string)`                | Method            | Returns given attribute value on current element ([PageObject.attribute](http://ember-cli-page-object.js.org/docs/v1.8.x/api/attribute)). |
| `click()`                     | Method            | [PageObject.clickable](http://ember-cli-page-object.js.org/docs/v1.8.x/api/clickable).                                                    |
| `contains(selectorOrElement)` | Method            | Returns whether given element exists inside current element.                                                                              |
| `hasClass(string)`            | Method            | Returns whether current element has given class.                                                                                          |
| `text()`                      | Method            | Returns text of current element ([PageObject.text](http://ember-cli-page-object.js.org/docs/v1.8.x/api/text)).                            |



Here's how you include `dragSortList` into your page object:

```js
// tests/pages/index.js

import {create, visitable} from 'ember-cli-page-object'
import dragSortList from 'dummy/tests/pages/components/drag-sort-list'

export default create({
  visit:        visitable('/'),
  sortableList: dragSortList
})
```

If you want to provide custom descriptors for the `dragSortList` page object component, use the spread operator:

```
import {create, hasClass, visitable} from 'ember-cli-page-object'
import dragSortList from 'dummy/tests/pages/components/drag-sort-list'

export default create({
  visit:        visitable('/'),
  sortableList: {
    ...dragSortList,
    isActive: hasClass('active')
  }
})
```

You can not provide custom descriptor for `dragSortItem`s. But you can describe item content. For example, you can describe following template:

```handlebars
{{#drag-sort-list
  items         = items
  dragEndAction = (action 'dragEndAction')
  as |item|
}}
  <div class = 'drag-sort-item-content'>
    {{item.name}}
  </div>
{{/drag-sort-list}}
```
```


...by importing the page object component factory from `{dragSortList}` and passing your item description into it like this:

```
import {create, visitable} from 'ember-cli-page-object'
import {dragSortList} from 'dummy/tests/pages/components/drag-sort-list'

export default create({
  visit:        visitable('/'),
  sortableList: dragSortList({
    scope: '.drag-sort-item-content',
    title: text()
  })
})
```

In a test, list items are available as `sortableList.items()`. Item content is available as `sortableList.items(index).content`.

For example, to assert the title of the first item in a list, using the page object from the last example, you can do this:

```js
assert.equal(sortableList.items(0).content.title, "Foo")
```



#### Sorting the dragSortList page object component

Inside your acceptance test, you can use the `sort` method on the `dragSortList` page object component.

To **rearrange items within a single list**, call `dragSortList.sort()` with three arguments:

| Argument      | Type    | Required | Description                                                                                                                     |
|:--------------|:--------|:---------|:--------------------------------------------------------------------------------------------------------------------------------|
| `sourceIndex` | Integer | yes      | Zero-based index of the item to pick up.                                                                                        |
| `targetIndex` | Integer | yes      | Zero-based index of the item to drop picked item on top of, calculated while the picked item is still on its original position. |
| `above`       | Boolean | yes      | Whether to drop picked item above (`true`) or below (`false`) target item.                                                      |

After executing `sort`, perform a wait using `await` or `andThen()`.

Example:

```js
test('sorting a list', async function (assert) {
  await page.visit()
  
  const list = page.sortableList
  
  await list.sort(0, 1, false)

  const expectedTitles = ['Bar', 'Foo', 'Baz', 'Quux']

  assert.equal(list.items().count, 4)

  expectedTitles.forEach((expectedTitle, k) => {
    m = `List #0 item #${k} content title`
    expect(list.items(k).content.title, m).equal(expectedTitle)
  })
}))
```



To **move an item from one list to another**, call `dragSortList.move()` with four arguments:

| Argument      | Type                  | Required                        | Description                                                                                                                                                                                                                                |
|:--------------|:----------------------|:--------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sourceIndex` | Integer               | yes                             | Zero-based index of the item to pick up.                                                                                                                                                                                                   |
| `targetList`  | Page object component | yes                             | The page object of the other sortable list component.                                                                                                                                                                                      |
| `targetIndex` | Integer               | no                              | Zero-based index of the item to drop picked item on top of, calculated while the picked item is still on its original position. When omitted, adds item to the end of the target list. **Must** be omitted when moving into an empty list. |
| `above`       | Boolean               | yes if `targetList` is provided | Whether to drop picked item above (`true`) or below (`false`) target item.                                                                                                                                                                 |

After executing `sort`, perform a wait using `await` or `andThen()`.

Example:

```js  
const list1 = page.sortableList1
const list2 = page.sortableList2

await list1.sort(0, list2, 1, false)
```

This will pick the first item from `list1` and drop it below the second item of `list2`.

See this addon's acceptance test for example.



## Development

### Do not use npm, use yarn

This project uses [Yarn](https://yarnpkg.com/) to lock dependencies. You can install yarn with `npm i -g yarn`.

### Installation for development

* `git clone <repository-url>` this repository
* `cd ember-drag-sort`
* `yarn install` :warning:

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).



### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).



### Branch names

Main branches are named as `gen-1`, `gen-2`, etc. Default branch on GitHub is where active development happens.

This naming scheme is due to the fact that this project uses SemVer. As a result, major version number will rise very quickly, without any correlation with actual major changes in the app.

The number in the branch name, "generation", is supposed to be incremented in these cases:
* A huge improvement or change happens in the addon.
* There's a change in the addon's API or architecture which introduces a necessity to maintain more than one branch at a time.
* The codebase is started from scratch.

Pull requests are welcome from feature branches. Make sure to discus proposed changes with addon maintainers to avoid wasted effort.



### Updating the table of contents

Maintaining the TOC by hand is extremely tedious. Use [this tiny webapp](https://lolmaus.github.io/tocdown/) to generate the TOC automatically. Enable the first two checkboxes there.



### Demo deployment

This command will deploy the app to https://deveo.github.io/ember-drag-sort/ :

    ember deploy prod



## Credits

Proudly built in [@Deveo](https://github.com/Deveo) by [@lolmaus](https://github.com/lolmaus) and [contributors](https://github.com/Deveo/ember-drag-sort/graphs/contributors).

https://deveo.com

Contains code fragments borrowed from:

* [jgwhite/ember-sortable](https://github.com/jgwhite/ember-sortable) ([MIT](https://github.com/jgwhite/ember-sortable/blob/master/LICENSE.md))


## License

[MIT](https://github.com/Deveo/ember-drag-sort/blob/gen-1/LICENSE.md).
