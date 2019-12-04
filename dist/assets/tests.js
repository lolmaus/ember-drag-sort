'use strict';

define("dummy/tests/acceptance/index-test", ["qunit", "@ember/test-helpers", "ember-qunit", "dummy/tests/pages/index"], function (_qunit, _testHelpers, _emberQunit, _index) {
  "use strict";

  let m;
  (0, _qunit.module)('Acceptance | index', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /index', async function (assert) {
      await _index.default.visit();
      m = 'Current URL';
      assert.equal((0, _testHelpers.currentURL)(), '/', m);

      const firstGroup = _index.default.listGroups(0);

      const expectedTitleGroups = [['Foo', 'Bar', 'Baz', 'Quux'], ['☰ Zomg', '☰ Lol']];
      expectedTitleGroups.forEach((expectedTitles, i) => {
        const list = firstGroup.lists(i);
        m = "List #".concat(i, " item count");
        assert.equal(list.items().count, expectedTitles.length, m);
        expectedTitles.forEach((expectedTitle, k) => {
          m = "List #".concat(i, " item #").concat(k, " content title");
          assert.equal(list.items(k).content.title, expectedTitle, m);
        });
      });
    });
    (0, _qunit.test)('sorting a list', async function (assert) {
      await _index.default.visit();

      const list = _index.default.listGroups(0).lists(0);

      await list.sort(0, 1, false);
      const expectedTitles = ['Bar', 'Foo', 'Baz', 'Quux'];
      m = 'List #0 items count';
      assert.equal(list.items().count, 4, m);
      expectedTitles.forEach((expectedTitle, k) => {
        m = "List #0 item #".concat(k, " content title");
        assert.equal(list.items(k).content.title, expectedTitle, m);
      });
    });
    (0, _qunit.test)('sorting between lists', async function (assert) {
      await _index.default.visit();

      const list0 = _index.default.listGroups(0).lists(0);

      const list1 = _index.default.listGroups(0).lists(1);

      await list0.move(0, list1, 1, false);
      const expectedTitles0 = ['Bar', 'Baz', 'Quux'];
      const expectedTitles1 = ['☰ Zomg', '☰ Lol', '☰ Foo'];
      m = 'List #0 items count';
      assert.equal(list0.items().count, 3, m);
      expectedTitles0.forEach((expectedTitle, k) => {
        m = "List #0 item #".concat(k, " content title");
        assert.equal(list0.items(k).content.title, expectedTitle, m);
      });
      m = 'List #1 items count';
      assert.equal(list1.items().count, 3, m);
      expectedTitles1.forEach((expectedTitle, k) => {
        m = "List #1 item #".concat(k, " content title");
        assert.equal(list1.items(k).content.title, expectedTitle, m);
      });
    });
    (0, _qunit.test)('disable sorting within a list when the determineForeignPositionAction parameter is given', async function (assert) {
      await _index.default.visit();

      const list0 = _index.default.listGroups(2).lists(0);

      await list0.sort(0, 1, false);
      const expectedTitles0 = ['Bar', 'Baz', 'Foo', 'Quux']; // List with disabled sorting

      expectedTitles0.forEach((expectedTitle, k) => {
        m = "List #0 item #".concat(k, " content title");
        assert.equal(list0.items(k).content.title, expectedTitle, m);
      });
    });
    (0, _qunit.test)('dragging into a sortable list when the sourcelist has the determineForeignPositionAction parameter', async function (assert) {
      await _index.default.visit();

      const list0 = _index.default.listGroups(2).lists(0);

      const list1 = _index.default.listGroups(2).lists(1);

      await list0.move(0, list1, 0, true);
      const expectedTitles0 = ['Baz', 'Foo', 'Quux'];
      const expectedTitles1 = ['Bar', 'Zomg', 'Lol']; // List with disabled sorting

      m = 'List #0 items count';
      assert.equal(list0.items().count, 3, m); // List with disabled sorting

      expectedTitles0.forEach((expectedTitle, k) => {
        m = "List #0 item #".concat(k, " content title");
        assert.equal(list0.items(k).content.title, expectedTitle, m);
      });
      m = 'List #1 items count';
      assert.equal(list1.items().count, 3, m);
      expectedTitles1.forEach((expectedTitle, k) => {
        m = "List #1 item #".concat(k, " content title");
        assert.equal(list1.items(k).content.title, expectedTitle, m);
      });
    });
    (0, _qunit.test)('sort into a list that has the determineForeignPositionAction parameter', async function (assert) {
      await _index.default.visit();

      const list0 = _index.default.listGroups(2).lists(0);

      const list1 = _index.default.listGroups(2).lists(1);

      await list1.move(0, list0, 0, false);
      const expectedTitles0 = ['Bar', 'Baz', 'Foo', 'Quux', 'Zomg'];
      const expectedTitles1 = ['Lol']; // List with disabled sorting

      m = 'List #0 items count';
      assert.equal(list0.items().count, 5, m); // List with disabled sorting

      expectedTitles0.forEach((expectedTitle, k) => {
        m = "List #0 item #".concat(k, " content title");
        assert.equal(list0.items(k).content.title, expectedTitle, m);
      });
      m = 'List #1 items count';
      assert.equal(list1.items().count, 1, m);
      expectedTitles1.forEach((expectedTitle, k) => {
        m = "List #1 item #".concat(k, " content title");
        assert.equal(list1.items(k).content.title, expectedTitle, m);
      });
    });
    (0, _qunit.test)('sorting from an unsortable list to a sortable list, and then back into an unsortable list, should not change the position', async function (assert) {
      await _index.default.visit();

      const list0 = _index.default.listGroups(2).lists(0);

      const list1 = _index.default.listGroups(2).lists(1);

      const item0_0 = list0.items(0);
      const item0_3 = list0.items(3);
      const item1_0 = list1.items(0);
      await item0_3.dragStart();
      await list1.dragEnter();
      await item1_0.dragOver(false);
      await list0.dragEnter();
      await item0_0.dragOver(false);
      await item0_3.dragEnd();
      await (0, _testHelpers.settled)();
      const expectedTitles0 = ['Bar', 'Baz', 'Foo', 'Quux'];
      const expectedTitles1 = ['Zomg', 'Lol']; // List with disabled sorting

      m = 'List #0 items count';
      assert.equal(list0.items().count, expectedTitles0.length, m); // List with disabled sorting

      expectedTitles0.forEach((expectedTitle, k) => {
        m = "List #0 item #".concat(k, " content title");
        assert.equal(list0.items(k).content.title, expectedTitle, m);
      });
      m = 'List #1 items count';
      assert.equal(list1.items().count, expectedTitles1.length, m);
      expectedTitles1.forEach((expectedTitle, k) => {
        m = "List #1 item #".concat(k, " content title");
        assert.equal(list1.items(k).content.title, expectedTitle, m);
      });
    });
    (0, _qunit.test)('sorting from an sortable list to an unsortable list should position alphabetically', async function (assert) {
      await _index.default.visit();

      const list0 = _index.default.listGroups(2).lists(0);

      const list1 = _index.default.listGroups(2).lists(1);

      const item0_0 = list0.items(0);
      let item1_0 = list1.items(0);
      await item1_0.dragStart();
      await list0.dragEnter();
      await item0_0.dragOver(true);
      await item1_0.dragEnd();
      await (0, _testHelpers.settled)();
      let expectedTitles0 = ['Bar', 'Baz', 'Foo', 'Quux', 'Zomg'];
      let expectedTitles1 = ['Lol']; // List with disabled sorting

      m = 'List #0 items count';
      assert.equal(list0.items().count, expectedTitles0.length, m); // List with disabled sorting

      expectedTitles0.forEach((expectedTitle, k) => {
        m = "List #0 item #".concat(k, " content title");
        assert.equal(list0.items(k).content.title, expectedTitle, m);
      });
      m = 'List #1 items count';
      assert.equal(list1.items().count, expectedTitles1.length, m);
      expectedTitles1.forEach((expectedTitle, k) => {
        m = "List #1 item #".concat(k, " content title");
        assert.equal(list1.items(k).content.title, expectedTitle, m);
      });
      item1_0 = list1.items(0);
      await item1_0.dragStart();
      await list0.dragEnter();
      await item0_0.dragOver(true);
      await item1_0.dragEnd();
      await (0, _testHelpers.settled)();
      expectedTitles0 = ['Bar', 'Baz', 'Foo', 'Lol', 'Quux', 'Zomg'];
      expectedTitles1 = []; // List with disabled sorting

      m = 'List #0 items count';
      assert.equal(list0.items().count, expectedTitles0.length, m); // List with disabled sorting

      expectedTitles0.forEach((expectedTitle, k) => {
        m = "List #0 item #".concat(k, " content title");
        assert.equal(list0.items(k).content.title, expectedTitle, m);
      });
      m = 'List #1 items count';
      assert.equal(list1.items().count, expectedTitles1.length, m);
      expectedTitles1.forEach((expectedTitle, k) => {
        m = "List #1 item #".concat(k, " content title");
        assert.equal(list1.items(k).content.title, expectedTitle, m);
      });
    });
  });
});
define("dummy/tests/integration/components/drag-sort-list-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-drag-sort/utils/trigger", "sinon"], function (_qunit, _emberQunit, _testHelpers, _trigger, _sinon) {
  "use strict";

  (0, _qunit.module)('Integration | Component | drag-sort-list', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it works', async function (assert) {
      const items = Ember.A([{
        name: 'foo'
      }, {
        name: 'bar'
      }, {
        name: 'baz'
      }]);

      const dragEndCallback = _sinon.default.spy();

      this.setProperties({
        items,
        dragEndCallback
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "vydYjfBj",
        "block": "{\"symbols\":[\"item\"],\"statements\":[[0,\"\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"dragEndAction\"],[[24,[\"items\"]],[28,\"action\",[[23,0,[]],[24,[\"dragEndCallback\"]]],null]]],{\"statements\":[[0,\"        \"],[7,\"div\",true],[8],[0,\"\\n          \"],[1,[23,1,[\"name\"]],false],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      const itemElements = (0, _testHelpers.findAll)('.dragSortItem');
      const [item0, item1] = itemElements;
      (0, _trigger.default)(item0, 'dragstart');
      (0, _trigger.default)(item1, 'dragover', false);
      (0, _trigger.default)(item0, 'dragend');
      await (0, _testHelpers.settled)();
      assert.ok(dragEndCallback.calledOnce);
      assert.ok(dragEndCallback.calledWithExactly({
        group: undefined,
        draggedItem: items.objectAt(0),
        sourceList: items,
        targetList: items,
        sourceIndex: 0,
        targetIndex: 1
      }));
    });
    (0, _qunit.test)('sorting with neither dragover nor dragenter', async function (assert) {
      const items = Ember.A([{
        name: 'foo'
      }, {
        name: 'bar'
      }, {
        name: 'baz'
      }]);

      const dragEndCallback = _sinon.default.spy();

      this.setProperties({
        items,
        dragEndCallback
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "vydYjfBj",
        "block": "{\"symbols\":[\"item\"],\"statements\":[[0,\"\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"dragEndAction\"],[[24,[\"items\"]],[28,\"action\",[[23,0,[]],[24,[\"dragEndCallback\"]]],null]]],{\"statements\":[[0,\"        \"],[7,\"div\",true],[8],[0,\"\\n          \"],[1,[23,1,[\"name\"]],false],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      const item0 = (0, _testHelpers.find)('.dragSortItem');
      (0, _trigger.default)(item0, 'dragstart');
      (0, _trigger.default)(item0, 'dragend');
      await (0, _testHelpers.settled)();
      assert.ok(dragEndCallback.notCalled);
    });
    (0, _qunit.test)('drag handle', async function (assert) {
      const items = Ember.A([{
        name: 'foo'
      }, {
        name: 'bar'
      }, {
        name: 'baz'
      }]);

      const dragEndCallback = _sinon.default.spy();

      this.setProperties({
        items,
        dragEndCallback
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "SwK92u0p",
        "block": "{\"symbols\":[\"item\"],\"statements\":[[0,\"\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"dragEndAction\",\"handle\"],[[24,[\"items\"]],[28,\"action\",[[23,0,[]],[24,[\"dragEndCallback\"]]],null],\".handle\"]],{\"statements\":[[0,\"        \"],[7,\"div\",true],[10,\"class\",\"handle\"],[8],[0,\"handle\"],[9],[0,\"\\n        \"],[7,\"div\",true],[8],[0,\"\\n          \"],[1,[23,1,[\"name\"]],false],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      const itemElements = (0, _testHelpers.findAll)('.dragSortItem');
      const [item0, item1] = itemElements;
      (0, _trigger.default)(item0, 'dragstart');
      (0, _trigger.default)(item1, 'dragover', false);
      (0, _trigger.default)(item0, 'dragend');
      await (0, _testHelpers.settled)();
      assert.ok(dragEndCallback.notCalled);
      (0, _trigger.default)(item0.querySelector('.handle'), 'dragstart');
      (0, _trigger.default)(item1, 'dragover', false);
      (0, _trigger.default)(item0, 'dragend');
      await (0, _testHelpers.settled)();
      assert.ok(dragEndCallback.calledOnce);
      assert.ok(dragEndCallback.calledWithExactly({
        group: undefined,
        draggedItem: items.objectAt(0),
        sourceList: items,
        targetList: items,
        sourceIndex: 0,
        targetIndex: 1
      }));
    });
    (0, _qunit.test)('nested drag handle', async function (assert) {
      const items = Ember.A([{
        name: 'foo'
      }, {
        name: 'bar'
      }, {
        name: 'baz'
      }]);

      const dragEndCallback = _sinon.default.spy();

      this.setProperties({
        items,
        dragEndCallback
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "ia+BYSEO",
        "block": "{\"symbols\":[\"item\"],\"statements\":[[0,\"\\n\"],[4,\"drag-sort-list\",null,[[\"items\",\"dragEndAction\",\"handle\"],[[24,[\"items\"]],[28,\"action\",[[23,0,[]],[24,[\"dragEndCallback\"]]],null],\".handle\"]],{\"statements\":[[0,\"        \"],[7,\"div\",true],[10,\"class\",\"handle\"],[8],[0,\"\\n          \"],[7,\"div\",true],[10,\"class\",\"handle2\"],[8],[0,\"handle\"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[7,\"div\",true],[8],[0,\"\\n          \"],[1,[23,1,[\"name\"]],false],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      const itemElements = (0, _testHelpers.findAll)('.dragSortItem');
      const [item0, item1] = itemElements;
      (0, _trigger.default)(item0, 'dragstart');
      (0, _trigger.default)(item1, 'dragover', false);
      (0, _trigger.default)(item0, 'dragend');
      await (0, _testHelpers.settled)();
      assert.ok(dragEndCallback.notCalled);
      (0, _trigger.default)(item0.querySelector('.handle2'), 'dragstart');
      (0, _trigger.default)(item1, 'dragover', false);
      (0, _trigger.default)(item0, 'dragend');
      await (0, _testHelpers.settled)();
      assert.ok(dragEndCallback.calledOnce);
      assert.ok(dragEndCallback.calledWithExactly({
        group: undefined,
        draggedItem: items.objectAt(0),
        sourceList: items,
        targetList: items,
        sourceIndex: 0,
        targetIndex: 1
      }));
    });
  });
});
define("dummy/tests/lint/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });
  QUnit.test('components/nested-item.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/nested-item.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/index.js should pass ESLint\n\n');
  });
  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });
  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
});
define("dummy/tests/lint/templates.template.lint-test", [], function () {
  "use strict";

  QUnit.module('TemplateLint');
  QUnit.test('dummy/templates/components/nested-item.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'dummy/templates/components/nested-item.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('dummy/templates/index.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'dummy/templates/index.hbs should pass TemplateLint.\n\n');
  });
});
define("dummy/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('acceptance/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/index-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/drag-sort-list-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/drag-sort-list-test.js should pass ESLint\n\n');
  });
  QUnit.test('pages/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pages/index.js should pass ESLint\n\n');
  });
  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
});
define("dummy/tests/page-object", ["exports", "ember-cli-page-object"], function (_exports, _emberCliPageObject) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "alias", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.alias;
    }
  });
  Object.defineProperty(_exports, "attribute", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.attribute;
    }
  });
  Object.defineProperty(_exports, "clickOnText", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.clickOnText;
    }
  });
  Object.defineProperty(_exports, "clickable", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.clickable;
    }
  });
  Object.defineProperty(_exports, "collection", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.collection;
    }
  });
  Object.defineProperty(_exports, "contains", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.contains;
    }
  });
  Object.defineProperty(_exports, "count", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.count;
    }
  });
  Object.defineProperty(_exports, "create", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.create;
    }
  });
  Object.defineProperty(_exports, "fillable", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.fillable;
    }
  });
  Object.defineProperty(_exports, "selectable", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.fillable;
    }
  });
  Object.defineProperty(_exports, "focusable", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.focusable;
    }
  });
  Object.defineProperty(_exports, "hasClass", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.hasClass;
    }
  });
  Object.defineProperty(_exports, "is", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.is;
    }
  });
  Object.defineProperty(_exports, "isHidden", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.isHidden;
    }
  });
  Object.defineProperty(_exports, "isPresent", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.isPresent;
    }
  });
  Object.defineProperty(_exports, "isVisible", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.isVisible;
    }
  });
  Object.defineProperty(_exports, "notHasClass", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.notHasClass;
    }
  });
  Object.defineProperty(_exports, "property", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.property;
    }
  });
  Object.defineProperty(_exports, "text", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.text;
    }
  });
  Object.defineProperty(_exports, "triggerable", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.triggerable;
    }
  });
  Object.defineProperty(_exports, "value", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.value;
    }
  });
  Object.defineProperty(_exports, "visitable", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.visitable;
    }
  });
  Object.defineProperty(_exports, "buildSelector", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.buildSelector;
    }
  });
  Object.defineProperty(_exports, "findElementWithAssert", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.findElementWithAssert;
    }
  });
  Object.defineProperty(_exports, "findElement", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.findElement;
    }
  });
  Object.defineProperty(_exports, "getContext", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.getContext;
    }
  });
  Object.defineProperty(_exports, "fullScope", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.fullScope;
    }
  });
  _exports.default = void 0;
  var _default = {
    alias: _emberCliPageObject.alias,
    attribute: _emberCliPageObject.attribute,
    blurrable: _emberCliPageObject.blurrable,
    clickOnText: _emberCliPageObject.clickOnText,
    clickable: _emberCliPageObject.clickable,
    collection: _emberCliPageObject.collection,
    contains: _emberCliPageObject.contains,
    count: _emberCliPageObject.count,
    create: _emberCliPageObject.create,
    fillable: _emberCliPageObject.fillable,
    focusable: _emberCliPageObject.focusable,
    hasClass: _emberCliPageObject.hasClass,
    is: _emberCliPageObject.is,
    isHidden: _emberCliPageObject.isHidden,
    isPresent: _emberCliPageObject.isPresent,
    isVisible: _emberCliPageObject.isVisible,
    notHasClass: _emberCliPageObject.notHasClass,
    property: _emberCliPageObject.property,
    selectable: _emberCliPageObject.fillable,
    text: _emberCliPageObject.text,
    triggerable: _emberCliPageObject.triggerable,
    value: _emberCliPageObject.value,
    visitable: _emberCliPageObject.visitable
  };
  _exports.default = _default;
  Ember.deprecate("Importing from \"test-support\" is now deprecated. Please import directly from the \"ember-cli-page-object\" module instead.", false, {
    id: 'ember-cli-page-object.import-from-test-support',
    until: "2.0.0",
    url: "https://gist.github.com/san650/17174e4b7b1fd80b049a47eb456a7cdc#file-import-from-test-support-js"
  });
});
define("dummy/tests/pages/components/_component", ["exports", "dummy/tests/page-object"], function (_exports, _pageObject) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.jquery = jquery;
  _exports.default = component;

  // A helper to leverage jQuery for page component queries
  function jquery(callback, errorIfMissing = true) {
    return {
      isDescriptor: true,

      get() {
        const $el = (0, _pageObject.findElement)(this);

        if (errorIfMissing && !$el.length) {
          throw new Error("Element ".concat(this.scope, " not found."));
        }

        return callback($el);
      }

    };
  }

  function component(scope = '', descriptor = {}) {
    // If a descriptor is passed as the first arg
    if (scope === Object(scope)) {
      descriptor = scope;
      scope = null;
    }

    return { ...(scope ? {
        scope,
        itemScope: scope
      } : {}),
      // inject the scope only if it was provided
      $: jquery($el => $el),
      attr: jquery($el => attrName => $el.attr(attrName)),
      click: (0, _pageObject.clickable)(),
      contains: jquery($el => selector => $el.find(selector).length > 0, false),
      empty: jquery($el => $el.is(':empty') || !$el.children().length && !$el.text().trim().length),
      exists: jquery($el => $el.length > 0, false),
      // false: don't spit an error if element isn't found
      index: jquery($el => $el.index()),
      hasClass: jquery($el => className => $el.hasClass(className)),
      visible: (0, _pageObject.isVisible)(),
      text: (0, _pageObject.text)(),
      ...descriptor
    };
  }
});
define("dummy/tests/pages/components/drag-sort-item", ["exports", "dummy/tests/page-object", "dummy/tests/pages/components/_component", "ember-drag-sort/utils/trigger"], function (_exports, _pageObject, _component, _trigger) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _component.default)({
    draggable: (0, _pageObject.attribute)('draggable'),
    isDragged: (0, _pageObject.hasClass)('-isDragged'),
    isDraggingOver: (0, _pageObject.hasClass)('-isDraggingOver'),
    placeholderAbove: (0, _pageObject.hasClass)('-placeholderBefore'),
    placeholderBelow: (0, _pageObject.hasClass)('-placeholderAfter'),

    dragStart(index) {
      (0, _trigger.default)(this.$.get(0), 'dragstart');
    },

    dragOver(above) {
      (0, _trigger.default)(this.$.get(0), 'dragover', above);
    },

    dragEnd() {
      (0, _trigger.default)(this.$.get(0), 'dragend');
    }

  });

  _exports.default = _default;
});
define("dummy/tests/pages/components/drag-sort-list", ["exports", "dummy/tests/pages/components/_component", "dummy/tests/pages/components/drag-sort-item", "ember-drag-sort/utils/trigger", "ember-cli-page-object"], function (_exports, _component, _dragSortItem, _trigger, _emberCliPageObject) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.dragSortList = dragSortList;
  _exports.default = void 0;

  function dragSortList(content = {}, handleSelector) {
    return (0, _component.default)({
      items: (0, _emberCliPageObject.collection)({
        itemScope: '> .dragSortItem',
        item: { ..._dragSortItem.default,
          content
        }
      }),
      draggingEnabled: (0, _emberCliPageObject.hasClass)('-draggingEnabled'),
      isDragging: (0, _emberCliPageObject.hasClass)('-isDragging'),
      isDraggingOver: (0, _emberCliPageObject.hasClass)('-isDraggingOver'),
      isEmpty: (0, _emberCliPageObject.hasClass)('-isEmpty'),
      isExpanded: (0, _emberCliPageObject.hasClass)('-isExpanded'),

      dragEnter() {
        (0, _trigger.default)(this.$.get(0), 'dragenter');
      },

      sort(sourceIndex, targetIndex, above) {
        return (0, _trigger.sort)(this.$.get(0), sourceIndex, targetIndex, above, handleSelector);
      },

      move(sourceIndex, targetList, targetIndex, above) {
        return (0, _trigger.move)(this.$.get(0), sourceIndex, targetList.$.get(0), targetIndex, above, handleSelector);
      }

    });
  }

  var _default = dragSortList();

  _exports.default = _default;
});
define("dummy/tests/pages/index", ["exports", "ember-cli-page-object", "dummy/tests/pages/components/drag-sort-list"], function (_exports, _emberCliPageObject, _dragSortList) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _emberCliPageObject.create)({
    visit: (0, _emberCliPageObject.visitable)('/'),
    listGroups: (0, _emberCliPageObject.collection)({
      scope: '.list-groups',
      itemScope: '.list-group',
      item: {
        lists: (0, _emberCliPageObject.collection)({
          itemScope: '.dragSortList',
          item: (0, _dragSortList.dragSortList)({
            title: (0, _emberCliPageObject.text)()
          })
        })
      }
    })
  });

  _exports.default = _default;
});
define("dummy/tests/test-helper", ["dummy/app", "dummy/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define('dummy/config/environment', [], function() {
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

require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
