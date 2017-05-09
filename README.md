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
    * [drag-sort-list arguments reference](#drag-sort-list-arguments-reference)
    * [HTML classes](#html-classes)
  * [CSS concerns](#css-concerns)
  * [Events](#events)
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
  dragEndAction = (action 'dragEndAction')
  as |item|
}}
  {{item.name}}
{{/drag-sort-list}}
```

### The drag end action

The `dragEndAction` action *must* be a closure action.

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
  actions : {
    dragEndAction ({sourceList, sourceIndex, targetList, targetIndex}) {
      const item = sourceList.objectAt(sourceIndex)

      sourceList.removeAt(sourceIndex)
      targetList.insertAt(targetIndex, item)
    }
  }
```



### drag-sort-list arguments reference

| Argument          | Type           | Default value | Description                                                                                       |
|:------------------|:---------------|:--------------|:--------------------------------------------------------------------------------------------------|
| `items`           | Ember Array    | <required>    | An array of items to display and offer sorting.                                                   |
| `dragEndAction`   | Closure action | <required>    | This callback will be called on source list when sorting is complete.                             |
| `group`           | <any>          | `undefined`   | Used to restrict dragging between multiple lists to only some of those lists. Typically a string. |
| `draggingEnabled` | Boolean        | `true`        | Disables sorting. Useful when `dragEndAction` is an async operation.                              |
| `childClass`      | String         | `""`          | HTML class applied to list item components.                                                       |
| `childTagName`    | String         | `"div"`       | `tagName` applied to list item components.                                                        |



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


## License

[MIT](https://github.com/Deveo/ember-drag-sort/blob/gen-1/LICENSE.md).
