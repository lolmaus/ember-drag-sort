import { module, test } from 'qunit'
import { currentURL, settled } from '@ember/test-helpers'
import { setupApplicationTest } from 'ember-qunit'
import page from 'dummy/tests/pages/index'

let m

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks)

  test('visiting /index', async function (assert) {
    await page.visit()

    m = 'Current URL'
    assert.equal(currentURL(), '/', m)

    const firstGroup = page.listGroups(0)

    const expectedTitleGroups = [
      ['Foo',  'Bar', 'Baz', 'Quux'],
      ['☰ Zomg', '☰ Lol'],
    ]

    expectedTitleGroups.forEach((expectedTitles, i) => {
      const list = firstGroup.lists(i)

      m = `List #${i} item count`
      assert.equal(list.items().count, expectedTitles.length, m)

      expectedTitles.forEach((expectedTitle, k) => {
        m = `List #${i} item #${k} content title`
        assert.equal(list.items(k).content.title, expectedTitle, m)
      })
    })
  })

  test('sorting a list', async function (assert) {
    await page.visit()

    const list = page.listGroups(0).lists(0)

    await list.sort(0, 1, false)

    const expectedTitles = ['Bar', 'Foo', 'Baz', 'Quux']

    m = 'List #0 items count'
    assert.equal(list.items().count, 4, m)

    expectedTitles.forEach((expectedTitle, k) => {
      m = `List #0 item #${k} content title`
      assert.equal(list.items(k).content.title, expectedTitle, m)
    })
  })


  test('sorting between lists', async function (assert) {
    await page.visit()

    const list0 = page.listGroups(0).lists(0)
    const list1 = page.listGroups(0).lists(1)

    await list0.move(0, list1, 1, false)

    const expectedTitles0 = ['Bar',  'Baz', 'Quux']
    const expectedTitles1 = ['☰ Zomg', '☰ Lol', '☰ Foo']

    m = 'List #0 items count'
    assert.equal(list0.items().count, 3, m)

    expectedTitles0.forEach((expectedTitle, k) => {
      m = `List #0 item #${k} content title`
      assert.equal(list0.items(k).content.title, expectedTitle, m)
    })

    m = 'List #1 items count'
    assert.equal(list1.items().count, 3, m)

    expectedTitles1.forEach((expectedTitle, k) => {
      m = `List #1 item #${k} content title`
      assert.equal(list1.items(k).content.title, expectedTitle, m)
    })
  })



  test('disable sorting within a list when the determineForeignPositionAction parameter is given', async function (assert) {
    await page.visit()

    const list0 = page.listGroups(2).lists(0)

    await list0.sort(0, 1, false)

    const expectedTitles0 = ['Bar', 'Baz', 'Foo', 'Quux']

    // List with disabled sorting
    expectedTitles0.forEach((expectedTitle, k) => {
      m = `List #0 item #${k} content title`
      assert.equal(list0.items(k).content.title, expectedTitle, m)
    })
  })



  test('dragging into a sortable list when the sourcelist has the determineForeignPositionAction parameter', async function (assert) {
    await page.visit()

    const list0 = page.listGroups(2).lists(0)
    const list1 = page.listGroups(2).lists(1)

    await list0.move(0, list1, 0, true)

    const expectedTitles0 = ['Baz', 'Foo', 'Quux']
    const expectedTitles1 = ['Bar', 'Zomg', 'Lol']

    // List with disabled sorting
    m = 'List #0 items count'
    assert.equal(list0.items().count, 3, m)

    // List with disabled sorting
    expectedTitles0.forEach((expectedTitle, k) => {
      m = `List #0 item #${k} content title`
      assert.equal(list0.items(k).content.title, expectedTitle, m)
    })

    m = 'List #1 items count'
    assert.equal(list1.items().count, 3, m)

    expectedTitles1.forEach((expectedTitle, k) => {
      m = `List #1 item #${k} content title`
      assert.equal(list1.items(k).content.title, expectedTitle, m)
    })
  })



  test('sort into a list that has the determineForeignPositionAction parameter', async function (assert) {
    await page.visit()

    const list0 = page.listGroups(2).lists(0)
    const list1 = page.listGroups(2).lists(1)

    await list1.move(0, list0, 0, false)

    const expectedTitles0 = ['Bar', 'Baz', 'Foo', 'Quux', 'Zomg']
    const expectedTitles1 = ['Lol']

    // List with disabled sorting
    m = 'List #0 items count'
    assert.equal(list0.items().count, 5, m)

    // List with disabled sorting
    expectedTitles0.forEach((expectedTitle, k) => {
      m = `List #0 item #${k} content title`
      assert.equal(list0.items(k).content.title, expectedTitle, m)
    })

    m = 'List #1 items count'
    assert.equal(list1.items().count, 1, m)

    expectedTitles1.forEach((expectedTitle, k) => {
      m = `List #1 item #${k} content title`
      assert.equal(list1.items(k).content.title, expectedTitle, m)
    })
  })



  test('sorting from an unsortable list to a sortable list, and then back into an unsortable list, should not change the position', async function (assert) {
    await page.visit()

    const list0 = page.listGroups(2).lists(0)
    const list1 = page.listGroups(2).lists(1)

    const item0_0 = list0.items(0)
    const item0_3 = list0.items(3)
    const item1_0 = list1.items(0)

    await item0_3.dragStart()
    await list1.dragEnter()
    await item1_0.dragOver(false)
    await list0.dragEnter()
    await item0_0.dragOver(false)
    await item0_3.dragEnd()

    await settled()

    const expectedTitles0 = ['Bar', 'Baz', 'Foo', 'Quux']
    const expectedTitles1 = ['Zomg', 'Lol']

    // List with disabled sorting
    m = 'List #0 items count'
    assert.equal(list0.items().count, expectedTitles0.length, m)

    // List with disabled sorting
    expectedTitles0.forEach((expectedTitle, k) => {
      m = `List #0 item #${k} content title`
      assert.equal(list0.items(k).content.title, expectedTitle, m)
    })

    m = 'List #1 items count'
    assert.equal(list1.items().count, expectedTitles1.length, m)

    expectedTitles1.forEach((expectedTitle, k) => {
      m = `List #1 item #${k} content title`
      assert.equal(list1.items(k).content.title, expectedTitle, m)
    })
  })



  test('sorting from an sortable list to an unsortable list should position alphabetically', async function (assert) {
    await page.visit()

    const list0 = page.listGroups(2).lists(0)
    const list1 = page.listGroups(2).lists(1)

    const item0_0 = list0.items(0)
    let item1_0   = list1.items(0)

    await item1_0.dragStart()
    await list0.dragEnter()
    await item0_0.dragOver(true)
    await item1_0.dragEnd()

    await settled()

    let expectedTitles0 = ['Bar', 'Baz', 'Foo', 'Quux', 'Zomg']
    let expectedTitles1 = ['Lol']

    // List with disabled sorting
    m = 'List #0 items count'
    assert.equal(list0.items().count, expectedTitles0.length, m)

    // List with disabled sorting
    expectedTitles0.forEach((expectedTitle, k) => {
      m = `List #0 item #${k} content title`
      assert.equal(list0.items(k).content.title, expectedTitle, m)
    })

    m = 'List #1 items count'
    assert.equal(list1.items().count, expectedTitles1.length, m)

    expectedTitles1.forEach((expectedTitle, k) => {
      m = `List #1 item #${k} content title`
      assert.equal(list1.items(k).content.title, expectedTitle, m)
    })

    item1_0 = list1.items(0)

    await item1_0.dragStart()
    await list0.dragEnter()
    await item0_0.dragOver(true)
    await item1_0.dragEnd()

    await settled()

    expectedTitles0 = ['Bar', 'Baz', 'Foo', 'Lol', 'Quux', 'Zomg']
    expectedTitles1 = []

    // List with disabled sorting
    m = 'List #0 items count'
    assert.equal(list0.items().count, expectedTitles0.length, m)

    // List with disabled sorting
    expectedTitles0.forEach((expectedTitle, k) => {
      m = `List #0 item #${k} content title`
      assert.equal(list0.items(k).content.title, expectedTitle, m)
    })

    m = 'List #1 items count'
    assert.equal(list1.items().count, expectedTitles1.length, m)

    expectedTitles1.forEach((expectedTitle, k) => {
      m = `List #1 item #${k} content title`
      assert.equal(list1.items(k).content.title, expectedTitle, m)
    })
  })
})
