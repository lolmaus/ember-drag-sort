'use strict';



;define("dummy/app", ["exports", "dummy/resolver", "ember-load-initializers", "dummy/config/environment"], function (_exports, _resolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
  var _default = App;
  _exports.default = _default;
});
;define("dummy/components/drag-sort-item", ["exports", "ember-drag-sort/components/drag-sort-item"], function (_exports, _dragSortItem) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dragSortItem.default;
    }
  });
});
;define("dummy/components/drag-sort-list", ["exports", "ember-drag-sort/components/drag-sort-list"], function (_exports, _dragSortList) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dragSortList.default;
    }
  });
});
;define("dummy/components/fork-me", ["exports", "ember-fork-me/components/fork-me"], function (_exports, _forkMe) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _forkMe.default;
    }
  });
});
;define("dummy/components/nested-item", ["exports", "dummy/templates/components/nested-item"], function (_exports, _nestedItem) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    layout: _nestedItem.default,
    classNames: ['nestedItem'],
    item: undefined,
    dragEndAction: undefined,
    group: 'nested group'
  });

  _exports.default = _default;
});
;define("dummy/controllers/index", ["exports", "ember-concurrency"], function (_exports, _emberConcurrency) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({
    items1: Ember.computed(() => Ember.A([{
      name: 'Foo'
    }, {
      name: 'Bar'
    }, {
      name: 'Baz'
    }, {
      name: 'Quux'
    }])),
    items2: Ember.computed(() => Ember.A([{
      name: 'Zomg'
    }, {
      name: 'Lol'
    }])),
    items3: Ember.computed(() => Ember.A([{
      name: 'Foo'
    }, {
      name: 'Bar'
    }, {
      name: 'Baz'
    }, {
      name: 'Quux'
    }])),
    items4: Ember.computed(() => Ember.A([{
      name: 'Zomg'
    }, {
      name: 'Lol'
    }])),
    items5: Ember.computed(() => Ember.A([{
      name: 'Bar'
    }, {
      name: 'Baz'
    }, {
      name: 'Foo'
    }, {
      name: 'Quux'
    }])),
    items6: Ember.computed(() => Ember.A([{
      name: 'Zomg'
    }, {
      name: 'Lol'
    }])),
    items7: Ember.computed(() => Ember.A([{
      name: 'Foo'
    }, {
      name: 'Bar'
    }, {
      name: 'Baz'
    }])),
    items8: Ember.computed(() => Ember.A()),
    items9: Ember.computed(() => Ember.A()),
    items10: Ember.computed(() => Ember.A([{
      name: 'Foo'
    }, {
      name: 'Bar'
    }, {
      name: 'Baz'
    }, {
      name: 'Quux'
    }])),
    items11: Ember.computed(() => Ember.A([{
      name: 'Zomg'
    }, {
      name: 'Lol'
    }])),
    items12: Ember.computed(() => Ember.A([{
      name: 'Foo'
    }, {
      name: 'Bar'
    }, {
      name: 'Baz'
    }, {
      name: 'Quux'
    }, {
      name: 'Zomg'
    }, {
      name: 'Lol'
    }, {
      name: 'Quuz'
    }, {
      name: 'Hello'
    }, {
      name: 'World'
    }])),
    items13: Ember.computed(() => Ember.A([{
      name: 'Foo'
    }, {
      name: 'Bar'
    }, {
      name: 'Baz'
    }, {
      name: 'Quux'
    }])),
    items14: Ember.computed(() => Ember.A([{
      name: 'حلقة واحدة للحكم عليهم جميعان'
    }, {
      name: 'حلقة واحدة للعثور عليهم'
    }, {
      name: 'حلقة واحدة لجلب لهم'
    }, {
      name: 'وفي الظلام لربطهم'
    }])),
    nestedItem: Ember.computed(() => ({
      name: 'Foo',
      children: Ember.A([{
        name: 'Bar',
        children: Ember.A([{
          name: 'Baz',
          children: Ember.A([])
        }, {
          name: 'Quuz',
          children: Ember.A([])
        }])
      }, {
        name: 'Zomg',
        children: Ember.A([])
      }, {
        name: 'Lol',
        children: Ember.A([])
      }])
    })),
    nestedItems2: Ember.computed(() => ({
      name: 'Foo',
      children: Ember.A([{
        name: 'Bar',
        children: Ember.A([{
          name: 'Baz',
          children: Ember.A([])
        }, {
          name: 'Quuz',
          children: Ember.A([])
        }])
      }, {
        name: 'Zomg',
        children: Ember.A([])
      }, {
        name: 'Lol',
        children: Ember.A([])
      }])
    })),
    networkFailure: false,
    actions: {
      dragEnd({
        sourceList,
        sourceIndex,
        targetList,
        targetIndex
      }) {
        if (sourceList === targetList && sourceIndex === targetIndex) return;
        const item = sourceList.objectAt(sourceIndex);
        sourceList.removeAt(sourceIndex);
        targetList.insertAt(targetIndex, item);
      },

      determineForeignPosition({
        draggedItem,
        items
      }) {
        return Ember.A(items.slice()) // create a copy of the list
        .addObject(draggedItem).sortBy('name').indexOf(draggedItem);
      },

      dragEnd2({
        sourceList,
        sourceIndex,
        targetList,
        targetIndex
      }) {
        if (sourceList === targetList && sourceIndex === targetIndex) return;
        const unsortableList = this.get('items7');
        let item = sourceList.objectAt(sourceIndex);
        if (sourceList === unsortableList) item = { ...item
        }; // shallow clone
        else sourceList.removeAt(sourceIndex);
        if (targetList !== unsortableList) targetList.insertAt(targetIndex, item);
      },

      determineForeignPosition2({
        /*draggedItem, */
        items
      }) {
        return items.length;
      }

    },
    dragEndTask: (0, _emberConcurrency.task)(function* ({
      sourceList,
      sourceIndex,
      targetList,
      targetIndex
    }) {
      if (sourceList === targetList && sourceIndex === targetIndex) return Ember.RSVP.resolve();
      const item = sourceList.objectAt(sourceIndex);
      sourceList.removeAt(sourceIndex);
      targetList.insertAt(targetIndex, item);
      yield (0, _emberConcurrency.timeout)(2000);

      if (this.get('networkFailure')) {
        // Rollback
        targetList.removeAt(targetIndex);
        sourceList.insertAt(sourceIndex, item);
        return Ember.RSVP.reject({
          message: 'Request timed out.'
        });
      }

      return Ember.RSVP.resolve();
    }).drop()
  });

  _exports.default = _default;
});
;define("dummy/ember-drag-sort/tests/addon.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | addon');
  QUnit.test('addon/components/drag-sort-item.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'addon/components/drag-sort-item.js should pass ESLint\n\n268:27 - Extra semicolon. (semi)');
  });
  QUnit.test('addon/components/drag-sort-list.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/components/drag-sort-list.js should pass ESLint\n\n');
  });
  QUnit.test('addon/services/drag-sort.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/services/drag-sort.js should pass ESLint\n\n');
  });
  QUnit.test('addon/utils/trigger.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/utils/trigger.js should pass ESLint\n\n');
  });
});
;define("dummy/ember-drag-sort/tests/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('app/components/drag-sort-item.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app/components/drag-sort-item.js should pass ESLint\n\n');
  });
  QUnit.test('app/components/drag-sort-list.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app/components/drag-sort-list.js should pass ESLint\n\n');
  });
  QUnit.test('app/services/drag-sort.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app/services/drag-sort.js should pass ESLint\n\n');
  });
});
;define("dummy/ember-drag-sort/tests/templates.template.lint-test", [], function () {
  "use strict";

  QUnit.module('TemplateLint');
  QUnit.test('addon/templates/components/drag-sort-item.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/templates/components/drag-sort-item.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('addon/templates/components/drag-sort-list.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/templates/components/drag-sort-list.hbs should pass TemplateLint.\n\n');
  });
});
;define("dummy/ember-drag-sort/tests/test-support.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | test-support');
  QUnit.test('test-support/pages/components/_component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-support/pages/components/_component.js should pass ESLint\n\n');
  });
  QUnit.test('test-support/pages/components/drag-sort-item.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-support/pages/components/drag-sort-item.js should pass ESLint\n\n');
  });
  QUnit.test('test-support/pages/components/drag-sort-list.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-support/pages/components/drag-sort-list.js should pass ESLint\n\n');
  });
});
;define("dummy/helpers/and", ["exports", "ember-truth-helpers/helpers/and"], function (_exports, _and) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _and.default;
    }
  });
  Object.defineProperty(_exports, "and", {
    enumerable: true,
    get: function () {
      return _and.and;
    }
  });
});
;define("dummy/helpers/append", ["exports", "ember-composable-helpers/helpers/append"], function (_exports, _append) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _append.default;
    }
  });
  Object.defineProperty(_exports, "append", {
    enumerable: true,
    get: function () {
      return _append.append;
    }
  });
});
;define("dummy/helpers/array", ["exports", "ember-composable-helpers/helpers/array"], function (_exports, _array) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _array.default;
    }
  });
  Object.defineProperty(_exports, "array", {
    enumerable: true,
    get: function () {
      return _array.array;
    }
  });
});
;define("dummy/helpers/cancel-all", ["exports", "ember-concurrency/helpers/cancel-all"], function (_exports, _cancelAll) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _cancelAll.default;
    }
  });
});
;define("dummy/helpers/chunk", ["exports", "ember-composable-helpers/helpers/chunk"], function (_exports, _chunk) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _chunk.default;
    }
  });
  Object.defineProperty(_exports, "chunk", {
    enumerable: true,
    get: function () {
      return _chunk.chunk;
    }
  });
});
;define("dummy/helpers/compact", ["exports", "ember-composable-helpers/helpers/compact"], function (_exports, _compact) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _compact.default;
    }
  });
});
;define("dummy/helpers/compute", ["exports", "ember-composable-helpers/helpers/compute"], function (_exports, _compute) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _compute.default;
    }
  });
  Object.defineProperty(_exports, "compute", {
    enumerable: true,
    get: function () {
      return _compute.compute;
    }
  });
});
;define("dummy/helpers/contains", ["exports", "ember-composable-helpers/helpers/contains"], function (_exports, _contains) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _contains.default;
    }
  });
  Object.defineProperty(_exports, "contains", {
    enumerable: true,
    get: function () {
      return _contains.contains;
    }
  });
});
;define("dummy/helpers/dec", ["exports", "ember-composable-helpers/helpers/dec"], function (_exports, _dec) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dec.default;
    }
  });
  Object.defineProperty(_exports, "dec", {
    enumerable: true,
    get: function () {
      return _dec.dec;
    }
  });
});
;define("dummy/helpers/drop", ["exports", "ember-composable-helpers/helpers/drop"], function (_exports, _drop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _drop.default;
    }
  });
});
;define("dummy/helpers/eq", ["exports", "ember-truth-helpers/helpers/equal"], function (_exports, _equal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _equal.default;
    }
  });
  Object.defineProperty(_exports, "equal", {
    enumerable: true,
    get: function () {
      return _equal.equal;
    }
  });
});
;define("dummy/helpers/filter-by", ["exports", "ember-composable-helpers/helpers/filter-by"], function (_exports, _filterBy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _filterBy.default;
    }
  });
});
;define("dummy/helpers/filter", ["exports", "ember-composable-helpers/helpers/filter"], function (_exports, _filter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _filter.default;
    }
  });
});
;define("dummy/helpers/find-by", ["exports", "ember-composable-helpers/helpers/find-by"], function (_exports, _findBy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _findBy.default;
    }
  });
});
;define("dummy/helpers/flatten", ["exports", "ember-composable-helpers/helpers/flatten"], function (_exports, _flatten) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _flatten.default;
    }
  });
  Object.defineProperty(_exports, "flatten", {
    enumerable: true,
    get: function () {
      return _flatten.flatten;
    }
  });
});
;define("dummy/helpers/group-by", ["exports", "ember-composable-helpers/helpers/group-by"], function (_exports, _groupBy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _groupBy.default;
    }
  });
});
;define("dummy/helpers/gt", ["exports", "ember-truth-helpers/helpers/gt"], function (_exports, _gt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gt.default;
    }
  });
  Object.defineProperty(_exports, "gt", {
    enumerable: true,
    get: function () {
      return _gt.gt;
    }
  });
});
;define("dummy/helpers/gte", ["exports", "ember-truth-helpers/helpers/gte"], function (_exports, _gte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gte.default;
    }
  });
  Object.defineProperty(_exports, "gte", {
    enumerable: true,
    get: function () {
      return _gte.gte;
    }
  });
});
;define("dummy/helpers/has-next", ["exports", "ember-composable-helpers/helpers/has-next"], function (_exports, _hasNext) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _hasNext.default;
    }
  });
  Object.defineProperty(_exports, "hasNext", {
    enumerable: true,
    get: function () {
      return _hasNext.hasNext;
    }
  });
});
;define("dummy/helpers/has-previous", ["exports", "ember-composable-helpers/helpers/has-previous"], function (_exports, _hasPrevious) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _hasPrevious.default;
    }
  });
  Object.defineProperty(_exports, "hasPrevious", {
    enumerable: true,
    get: function () {
      return _hasPrevious.hasPrevious;
    }
  });
});
;define("dummy/helpers/inc", ["exports", "ember-composable-helpers/helpers/inc"], function (_exports, _inc) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _inc.default;
    }
  });
  Object.defineProperty(_exports, "inc", {
    enumerable: true,
    get: function () {
      return _inc.inc;
    }
  });
});
;define("dummy/helpers/intersect", ["exports", "ember-composable-helpers/helpers/intersect"], function (_exports, _intersect) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _intersect.default;
    }
  });
});
;define("dummy/helpers/invoke", ["exports", "ember-composable-helpers/helpers/invoke"], function (_exports, _invoke) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _invoke.default;
    }
  });
  Object.defineProperty(_exports, "invoke", {
    enumerable: true,
    get: function () {
      return _invoke.invoke;
    }
  });
});
;define("dummy/helpers/is-array", ["exports", "ember-truth-helpers/helpers/is-array"], function (_exports, _isArray) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isArray.default;
    }
  });
  Object.defineProperty(_exports, "isArray", {
    enumerable: true,
    get: function () {
      return _isArray.isArray;
    }
  });
});
;define("dummy/helpers/is-empty", ["exports", "ember-truth-helpers/helpers/is-empty"], function (_exports, _isEmpty) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isEmpty.default;
    }
  });
});
;define("dummy/helpers/is-equal", ["exports", "ember-truth-helpers/helpers/is-equal"], function (_exports, _isEqual) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(_exports, "isEqual", {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
});
;define("dummy/helpers/join", ["exports", "ember-composable-helpers/helpers/join"], function (_exports, _join) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _join.default;
    }
  });
});
;define("dummy/helpers/lt", ["exports", "ember-truth-helpers/helpers/lt"], function (_exports, _lt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lt.default;
    }
  });
  Object.defineProperty(_exports, "lt", {
    enumerable: true,
    get: function () {
      return _lt.lt;
    }
  });
});
;define("dummy/helpers/lte", ["exports", "ember-truth-helpers/helpers/lte"], function (_exports, _lte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lte.default;
    }
  });
  Object.defineProperty(_exports, "lte", {
    enumerable: true,
    get: function () {
      return _lte.lte;
    }
  });
});
;define("dummy/helpers/map-by", ["exports", "ember-composable-helpers/helpers/map-by"], function (_exports, _mapBy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _mapBy.default;
    }
  });
});
;define("dummy/helpers/map", ["exports", "ember-composable-helpers/helpers/map"], function (_exports, _map) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _map.default;
    }
  });
});
;define("dummy/helpers/next", ["exports", "ember-composable-helpers/helpers/next"], function (_exports, _next) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _next.default;
    }
  });
  Object.defineProperty(_exports, "next", {
    enumerable: true,
    get: function () {
      return _next.next;
    }
  });
});
;define("dummy/helpers/not-eq", ["exports", "ember-truth-helpers/helpers/not-equal"], function (_exports, _notEqual) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _notEqual.default;
    }
  });
  Object.defineProperty(_exports, "notEq", {
    enumerable: true,
    get: function () {
      return _notEqual.notEq;
    }
  });
});
;define("dummy/helpers/not", ["exports", "ember-truth-helpers/helpers/not"], function (_exports, _not) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _not.default;
    }
  });
  Object.defineProperty(_exports, "not", {
    enumerable: true,
    get: function () {
      return _not.not;
    }
  });
});
;define("dummy/helpers/object-at", ["exports", "ember-composable-helpers/helpers/object-at"], function (_exports, _objectAt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _objectAt.default;
    }
  });
  Object.defineProperty(_exports, "objectAt", {
    enumerable: true,
    get: function () {
      return _objectAt.objectAt;
    }
  });
});
;define("dummy/helpers/optional", ["exports", "ember-composable-helpers/helpers/optional"], function (_exports, _optional) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _optional.default;
    }
  });
  Object.defineProperty(_exports, "optional", {
    enumerable: true,
    get: function () {
      return _optional.optional;
    }
  });
});
;define("dummy/helpers/or", ["exports", "ember-truth-helpers/helpers/or"], function (_exports, _or) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _or.default;
    }
  });
  Object.defineProperty(_exports, "or", {
    enumerable: true,
    get: function () {
      return _or.or;
    }
  });
});
;define("dummy/helpers/perform", ["exports", "ember-concurrency/helpers/perform"], function (_exports, _perform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _perform.default;
    }
  });
});
;define("dummy/helpers/pipe-action", ["exports", "ember-composable-helpers/helpers/pipe-action"], function (_exports, _pipeAction) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pipeAction.default;
    }
  });
});
;define("dummy/helpers/pipe", ["exports", "ember-composable-helpers/helpers/pipe"], function (_exports, _pipe) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pipe.default;
    }
  });
  Object.defineProperty(_exports, "pipe", {
    enumerable: true,
    get: function () {
      return _pipe.pipe;
    }
  });
});
;define("dummy/helpers/previous", ["exports", "ember-composable-helpers/helpers/previous"], function (_exports, _previous) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _previous.default;
    }
  });
  Object.defineProperty(_exports, "previous", {
    enumerable: true,
    get: function () {
      return _previous.previous;
    }
  });
});
;define("dummy/helpers/queue", ["exports", "ember-composable-helpers/helpers/queue"], function (_exports, _queue) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _queue.default;
    }
  });
  Object.defineProperty(_exports, "queue", {
    enumerable: true,
    get: function () {
      return _queue.queue;
    }
  });
});
;define("dummy/helpers/range", ["exports", "ember-composable-helpers/helpers/range"], function (_exports, _range) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _range.default;
    }
  });
  Object.defineProperty(_exports, "range", {
    enumerable: true,
    get: function () {
      return _range.range;
    }
  });
});
;define("dummy/helpers/reduce", ["exports", "ember-composable-helpers/helpers/reduce"], function (_exports, _reduce) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _reduce.default;
    }
  });
});
;define("dummy/helpers/reject-by", ["exports", "ember-composable-helpers/helpers/reject-by"], function (_exports, _rejectBy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _rejectBy.default;
    }
  });
});
;define("dummy/helpers/repeat", ["exports", "ember-composable-helpers/helpers/repeat"], function (_exports, _repeat) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _repeat.default;
    }
  });
  Object.defineProperty(_exports, "repeat", {
    enumerable: true,
    get: function () {
      return _repeat.repeat;
    }
  });
});
;define("dummy/helpers/reverse", ["exports", "ember-composable-helpers/helpers/reverse"], function (_exports, _reverse) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _reverse.default;
    }
  });
});
;define("dummy/helpers/shuffle", ["exports", "ember-composable-helpers/helpers/shuffle"], function (_exports, _shuffle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _shuffle.default;
    }
  });
  Object.defineProperty(_exports, "shuffle", {
    enumerable: true,
    get: function () {
      return _shuffle.shuffle;
    }
  });
});
;define("dummy/helpers/slice", ["exports", "ember-composable-helpers/helpers/slice"], function (_exports, _slice) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _slice.default;
    }
  });
});
;define("dummy/helpers/sort-by", ["exports", "ember-composable-helpers/helpers/sort-by"], function (_exports, _sortBy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _sortBy.default;
    }
  });
});
;define("dummy/helpers/take", ["exports", "ember-composable-helpers/helpers/take"], function (_exports, _take) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _take.default;
    }
  });
});
;define("dummy/helpers/task", ["exports", "ember-concurrency/helpers/task"], function (_exports, _task) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _task.default;
    }
  });
});
;define("dummy/helpers/toggle-action", ["exports", "ember-composable-helpers/helpers/toggle-action"], function (_exports, _toggleAction) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _toggleAction.default;
    }
  });
});
;define("dummy/helpers/toggle", ["exports", "ember-composable-helpers/helpers/toggle"], function (_exports, _toggle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
  Object.defineProperty(_exports, "toggle", {
    enumerable: true,
    get: function () {
      return _toggle.toggle;
    }
  });
});
;define("dummy/helpers/union", ["exports", "ember-composable-helpers/helpers/union"], function (_exports, _union) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _union.default;
    }
  });
});
;define("dummy/helpers/without", ["exports", "ember-composable-helpers/helpers/without"], function (_exports, _without) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _without.default;
    }
  });
  Object.defineProperty(_exports, "without", {
    enumerable: true,
    get: function () {
      return _without.without;
    }
  });
});
;define("dummy/helpers/xor", ["exports", "ember-truth-helpers/helpers/xor"], function (_exports, _xor) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xor.default;
    }
  });
  Object.defineProperty(_exports, "xor", {
    enumerable: true,
    get: function () {
      return _xor.xor;
    }
  });
});
;define("dummy/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }

  };
  _exports.default = _default;
});
;define("dummy/initializers/ember-concurrency", ["exports", "ember-concurrency/initializers/ember-concurrency"], function (_exports, _emberConcurrency) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberConcurrency.default;
    }
  });
});
;define("dummy/initializers/export-application-global", ["exports", "dummy/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("dummy/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _emberResolver.default;
  _exports.default = _default;
});
;define("dummy/router", ["exports", "dummy/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });
  Router.map(function () {});
  var _default = Router;
  _exports.default = _default;
});
;define("dummy/services/drag-sort", ["exports", "ember-drag-sort/services/drag-sort"], function (_exports, _dragSort) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dragSort.default;
    }
  });
});
;define("dummy/templates/components/nested-item", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "SyxGPzb6",
    "block": "{\"symbols\":[\"child\"],\"statements\":[[7,\"p\",true],[10,\"class\",\"nestedItem-title\"],[8],[0,\"\\n  \"],[1,[24,[\"item\",\"name\"]],false],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"group\",\"dragEndAction\"],[[24,[\"item\",\"children\"]],[24,[\"group\"]],[24,[\"dragEndAction\"]]]],{\"statements\":[[0,\"  \"],[1,[28,\"nested-item\",null,[[\"item\",\"group\",\"dragEndAction\"],[[23,1,[]],[24,[\"group\"]],[24,[\"dragEndAction\"]]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "dummy/templates/components/nested-item.hbs"
    }
  });

  _exports.default = _default;
});
;define("dummy/templates/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "QibBVi5p",
    "block": "{\"symbols\":[\"item\",\"item\",\"item\",\"item\",\"item\",\"item\",\"item\",\"item\",\"item\",\"item\",\"item\",\"item\",\"item\",\"item\"],\"statements\":[[1,[28,\"fork-me\",[\"https://github.com/kaliber5/ember-drag-sort/\"],null],false],[0,\"\\n\\n\"],[7,\"h1\",true],[8],[0,\"ember-drag-sort demo\"],[9],[0,\"\\n\\n\"],[7,\"p\",true],[8],[0,\"\\n  See\\n\\n  \"],[7,\"a\",true],[10,\"href\",\"https://github.com/kaliber5/ember-drag-sort/blob/gen-0/tests/dummy/app/templates/index.hbs\"],[8],[1,[22,\"concat\"],false],[0,\"demo template source\"],[1,[22,\"concat\"],false],[9],[0,\"\\n\\n  and\\n\\n  \"],[7,\"a\",true],[10,\"href\",\"https://github.com/kaliber5/ember-drag-sort/blob/gen-0/tests/dummy/app/controllers/index.js\"],[8],[1,[22,\"concat\"],false],[0,\"demo controller source\"],[1,[22,\"concat\"],false],[9],[0,\".\\n\"],[9],[0,\"\\n\\n\\n\\n\"],[7,\"div\",true],[10,\"class\",\"list-groups\"],[8],[0,\"\\n\\n  \"],[7,\"div\",true],[10,\"class\",\"list-group-wrapper\"],[8],[0,\"\\n    \"],[7,\"h2\",true],[8],[0,\"Simple usage\"],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"\\n      Sort lists, drag between lists. Won't let you drag items from/to other groups.\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"section\",true],[10,\"class\",\"list-group\"],[8],[0,\"\\n      \"],[7,\"article\",true],[10,\"class\",\"list\"],[8],[0,\"\\n        \"],[7,\"h4\",true],[8],[0,\"List 1\"],[9],[0,\"\\n\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"dragEndAction\"],[[24,[\"items1\"]],[28,\"action\",[[23,0,[]],\"dragEnd\"],null]]],{\"statements\":[[0,\"          \"],[7,\"div\",true],[10,\"class\",\"the-item\"],[8],[0,\"\\n            \"],[1,[23,14,[\"name\"]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[14]},null],[0,\"      \"],[9],[0,\"\\n\\n      \"],[7,\"article\",true],[10,\"class\",\"list\"],[8],[0,\"\\n        \"],[7,\"h4\",true],[8],[0,\"List 2 with drag handles\"],[9],[0,\"\\n\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"handle\",\"dragEndAction\"],[[24,[\"items2\"]],\".handle\",[28,\"action\",[[23,0,[]],\"dragEnd\"],null]]],{\"statements\":[[0,\"          \"],[7,\"div\",true],[10,\"class\",\"the-item\"],[8],[0,\"\\n            \"],[7,\"span\",true],[10,\"class\",\"handle\"],[10,\"draggable\",\"true\"],[8],[0,\"☰\"],[9],[0,\"\\n            \"],[1,[23,13,[\"name\"]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[13]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n\\n\\n  \"],[7,\"div\",true],[10,\"class\",\"list-group-wrapper\"],[8],[0,\"\\n    \"],[7,\"h2\",true],[8],[0,\"Async action\"],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"\\n      Uses async action, driven by \"],[7,\"a\",true],[10,\"href\",\"http://ember-concurrency.com/\"],[8],[0,\"ember-concurrency\"],[9],[0,\".\\n\\n      See \"],[7,\"a\",true],[10,\"href\",\"https://github.com/kaliber5/ember-drag-sort/blob/gen-1/tests/dummy/app/controllers/index.js#L158-L177\"],[8],[0,\"task source\"],[9],[0,\".\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"\\n      \"],[7,\"label\",true],[8],[0,\"\\n        \"],[1,[28,\"input\",null,[[\"type\",\"checked\"],[\"checkbox\",[24,[\"networkFailure\"]]]]],false],[0,\"\\n        Simulate network failure.\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n\\n    \"],[7,\"p\",true],[8],[0,\"\\n      Status:\\n\\n\"],[4,\"if\",[[24,[\"dragEndTask\",\"isRunning\"]]],null,{\"statements\":[[0,\"        Updating...\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[24,[\"dragEndTask\",\"last\",\"error\"]]],null,{\"statements\":[[0,\"        \"],[1,[24,[\"dragEndTask\",\"last\",\"error\",\"message\"]],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        Idle.\\n      \"]],\"parameters\":[]}]],\"parameters\":[]}],[0,\"    \"],[9],[0,\"\\n\\n    \"],[7,\"section\",true],[10,\"class\",\"list-group\"],[8],[0,\"\\n      \"],[7,\"article\",true],[10,\"class\",\"list\"],[8],[0,\"\\n        \"],[7,\"h4\",true],[8],[0,\"List 3\"],[9],[0,\"\\n\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"group\",\"draggingEnabled\",\"dragEndAction\"],[[24,[\"items3\"]],2,[24,[\"dragEndTask\",\"isIdle\"]],[28,\"action\",[[23,0,[]],[28,\"perform\",[[24,[\"dragEndTask\"]]],null]],null]]],{\"statements\":[[0,\"          \"],[7,\"div\",true],[10,\"class\",\"the-item\"],[8],[0,\"\\n            \"],[1,[23,12,[\"name\"]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[12]},null],[0,\"      \"],[9],[0,\"\\n\\n\\n      \"],[7,\"article\",true],[10,\"class\",\"list\"],[8],[0,\"\\n        \"],[7,\"h4\",true],[8],[0,\"List 4\"],[9],[0,\"\\n\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"group\",\"draggingEnabled\",\"dragEndAction\"],[[24,[\"items4\"]],2,[28,\"not\",[[24,[\"dragEndTask\",\"isRunning\"]]],null],[28,\"action\",[[23,0,[]],[28,\"perform\",[[24,[\"dragEndTask\"]]],null]],null]]],{\"statements\":[[0,\"          \"],[7,\"div\",true],[10,\"class\",\"the-item\"],[8],[0,\"\\n            \"],[1,[23,11,[\"name\"]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[11]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\\n\"],[7,\"div\",true],[10,\"class\",\"list-groups\"],[8],[0,\"\\n\\n  \"],[7,\"div\",true],[10,\"class\",\"list-group-wrapper\"],[8],[0,\"\\n    \"],[7,\"h2\",true],[8],[0,\"Unsortable list\"],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"\\n      Use `determineForeignPositionAction` to prevent user from rearranging a list, while still letting them drag in and out of the list\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"section\",true],[10,\"class\",\"list-group\"],[8],[0,\"\\n      \"],[7,\"article\",true],[10,\"class\",\"list\"],[8],[0,\"\\n        \"],[7,\"h4\",true],[8],[0,\"List 5 (always sorted alphabetically)\"],[9],[0,\"\\n\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"group\",\"dragEndAction\",\"determineForeignPositionAction\"],[[24,[\"items5\"]],3,[28,\"action\",[[23,0,[]],\"dragEnd\"],null],[28,\"action\",[[23,0,[]],\"determineForeignPosition\"],null]]],{\"statements\":[[0,\"          \"],[7,\"div\",true],[10,\"class\",\"the-item\"],[8],[0,\"\\n            \"],[1,[23,10,[\"name\"]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[10]},null],[0,\"      \"],[9],[0,\"\\n\\n      \"],[7,\"article\",true],[10,\"class\",\"list\"],[8],[0,\"\\n        \"],[7,\"h4\",true],[8],[0,\"List 6 (sorted by user)\"],[9],[0,\"\\n\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"group\",\"dragEndAction\"],[[24,[\"items6\"]],3,[28,\"action\",[[23,0,[]],\"dragEnd\"],null]]],{\"statements\":[[0,\"          \"],[7,\"div\",true],[10,\"class\",\"the-item\"],[8],[0,\"\\n            \"],[1,[23,9,[\"name\"]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[9]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[7,\"div\",true],[10,\"class\",\"list-group-wrapper\"],[8],[0,\"\\n    \"],[7,\"h2\",true],[8],[0,\"Create copies of items by dragging out, delete by dragging in\"],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"\\n      Drag out of source list to create copies of items. Drag back into the source list to remove copies. The source list can't be modified.\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"section\",true],[10,\"class\",\"list-group\"],[8],[0,\"\\n      \"],[7,\"article\",true],[10,\"class\",\"list\"],[8],[0,\"\\n        \"],[7,\"h4\",true],[8],[0,\"List 7 (source, always sorted alphabetically)\"],[9],[0,\"\\n\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"group\",\"dragEndAction\",\"determineForeignPositionAction\"],[[24,[\"items7\"]],4,[28,\"action\",[[23,0,[]],\"dragEnd2\"],null],[28,\"action\",[[23,0,[]],\"determineForeignPosition2\"],null]]],{\"statements\":[[0,\"          \"],[7,\"div\",true],[10,\"class\",\"the-item\"],[8],[0,\"\\n            \"],[1,[23,8,[\"name\"]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[8]},null],[0,\"      \"],[9],[0,\"\\n\\n      \"],[7,\"article\",true],[10,\"class\",\"list\"],[8],[0,\"\\n        \"],[7,\"h4\",true],[8],[0,\"List 8 (target, sorted by user)\"],[9],[0,\"\\n\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"group\",\"dragEndAction\"],[[24,[\"items8\"]],4,[28,\"action\",[[23,0,[]],\"dragEnd2\"],null]]],{\"statements\":[[0,\"          \"],[7,\"div\",true],[10,\"class\",\"the-item\"],[8],[0,\"\\n            \"],[1,[23,7,[\"name\"]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[7]},null],[0,\"      \"],[9],[0,\"\\n\\n      \"],[7,\"article\",true],[10,\"class\",\"list\"],[8],[0,\"\\n        \"],[7,\"h4\",true],[8],[0,\"List 9 (target, sorted by user)\"],[9],[0,\"\\n\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"group\",\"dragEndAction\"],[[24,[\"items9\"]],4,[28,\"action\",[[23,0,[]],\"dragEnd2\"],null]]],{\"statements\":[[0,\"          \"],[7,\"div\",true],[10,\"class\",\"the-item\"],[8],[0,\"\\n            \"],[1,[23,6,[\"name\"]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[6]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n\\n\\n  \"],[7,\"div\",true],[10,\"class\",\"list-group-wrapper\"],[8],[0,\"\\n    \"],[7,\"h2\",true],[8],[0,\"Tables\"],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"\\n      ember-drag-sort uses a simple CSS technique to render the placeholder: `:before` and `:after` pseudoelements.\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"\\n      Unfortunately, this doesn't work with HTML tables because table semantics are very restrictive. To work around this problem, top/bottom padding on table cells can be used instead of selectors.\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"\\n      This is not a great solution because padding appears \"],[7,\"em\",true],[8],[0,\"inside\"],[9],[0,\" table cells. If you want your cells to have borders, you'll have to apply them to inner elements instead.\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"\\n      See \"],[7,\"a\",true],[10,\"href\",\"https://github.com/kaliber5/ember-drag-sort/blob/gen-0/tests/dummy/app/styles/app.css#L126-L159\"],[8],[0,\"style overrides of this demo.\"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"section\",true],[10,\"class\",\"list-group\"],[8],[0,\"\\n      \"],[7,\"article\",true],[10,\"class\",\"list\"],[8],[0,\"\\n        \"],[7,\"h4\",true],[8],[0,\"Table 1\"],[9],[0,\"\\n\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"tagName\",\"childTagName\",\"group\",\"dragEndAction\"],[[24,[\"items10\"]],\"table\",\"tr\",\"table\",[28,\"action\",[[23,0,[]],\"dragEnd\"],null]]],{\"statements\":[[0,\"          \"],[7,\"td\",true],[8],[0,\"\\n            \"],[7,\"div\",true],[10,\"class\",\"the-item\"],[8],[0,\"\\n              \"],[1,[23,5,[\"name\"]],false],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[5]},null],[0,\"      \"],[9],[0,\"\\n\\n      \"],[7,\"article\",true],[10,\"class\",\"list\"],[8],[0,\"\\n        \"],[7,\"h4\",true],[8],[0,\"Table 2\"],[9],[0,\"\\n\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"tagName\",\"childTagName\",\"group\",\"dragEndAction\"],[[24,[\"items11\"]],\"table\",\"tr\",\"table\",[28,\"action\",[[23,0,[]],\"dragEnd\"],null]]],{\"statements\":[[0,\"          \"],[7,\"td\",true],[8],[0,\"\\n            \"],[7,\"div\",true],[10,\"class\",\"the-item\"],[8],[0,\"\\n              \"],[1,[23,4,[\"name\"]],false],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[7,\"div\",true],[10,\"class\",\"list-group-wrapper\"],[8],[0,\"\\n    \"],[7,\"h2\",true],[8],[0,\"Horizontal list\"],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"\\n      Set `isHorizontal=true` for a horizontal drag n drop. You can also drag between a horizontal list and a vertical.\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"section\",true],[10,\"class\",\"list-group\"],[8],[0,\"\\n      \"],[7,\"article\",true],[10,\"class\",\"horizontal-list list\"],[8],[0,\"\\n        \"],[7,\"h4\",true],[8],[0,\"List 10\"],[9],[0,\"\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"dragEndAction\",\"isHorizontal\"],[[24,[\"items12\"]],[28,\"action\",[[23,0,[]],\"dragEnd\"],null],true]],{\"statements\":[[0,\"          \"],[7,\"div\",true],[10,\"class\",\"the-item\"],[8],[0,\"\\n            \"],[1,[23,3,[\"name\"]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"      \"],[9],[0,\"\\n\\n      \"],[7,\"article\",true],[10,\"class\",\"list\"],[8],[0,\"\\n        \"],[7,\"h4\",true],[8],[0,\"List 11\"],[9],[0,\"\\n\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"dragEndAction\"],[[24,[\"items13\"]],[28,\"action\",[[23,0,[]],\"dragEnd\"],null]]],{\"statements\":[[0,\"          \"],[7,\"div\",true],[10,\"class\",\"the-item\"],[8],[0,\"\\n            \"],[1,[23,2,[\"name\"]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[7,\"section\",true],[10,\"class\",\"list-group list-groups\"],[8],[0,\"\\n      \"],[7,\"article\",true],[10,\"class\",\"horizontal-list list\"],[8],[0,\"\\n        \"],[7,\"h4\",true],[8],[0,\"List 12 - Right to left\"],[9],[0,\"\\n\\n        \"],[7,\"p\",true],[8],[0,\"Use `isRtl=true` if you're using a language which is read right to left. Has no effect when not using a horizontal list.\"],[9],[0,\"\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"dragEndAction\",\"isHorizontal\",\"isRtl\"],[[24,[\"items14\"]],[28,\"action\",[[23,0,[]],\"dragEnd\"],null],true,true]],{\"statements\":[[0,\"          \"],[7,\"div\",true],[10,\"class\",\"the-item\"],[8],[0,\"\\n            \"],[1,[23,1,[\"name\"]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[7,\"div\",true],[10,\"class\",\"list-groups\"],[8],[0,\"\\n  \"],[7,\"div\",true],[10,\"class\",\"list-group-wrapper\"],[8],[0,\"\\n    \"],[7,\"h2\",true],[8],[0,\"Nested list\"],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"\\n      See\\n      \"],[7,\"a\",true],[10,\"href\",\"https://github.com/kaliber5/ember-drag-sort/blob/gen-0/tests/dummy/app/templates/components/nested-item.hbs\"],[8],[1,[22,\"concat\"],false],[0,\"component template source\"],[1,[22,\"concat\"],false],[9],[0,\".\\n    \"],[9],[0,\"\\n\\n    \"],[1,[28,\"nested-item\",null,[[\"item\",\"dragEndAction\"],[[24,[\"nestedItem\"]],[28,\"action\",[[23,0,[]],\"dragEnd\"],null]]]],false],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"Warning: Nested lists doesn't work well with horizontal lists.\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "dummy/templates/index.hbs"
    }
  });

  _exports.default = _default;
});
;

;define('dummy/config/environment', [], function() {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("dummy/app")["default"].create({});
          }
        
//# sourceMappingURL=dummy.map
