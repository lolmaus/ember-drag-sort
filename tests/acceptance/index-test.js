import { test } from 'qunit'
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance'
import page from 'dummy/tests/pages/index'
import { withChai } from 'ember-cli-chai/qunit'
import wait from 'ember-test-helpers/wait'


let m



moduleForAcceptance('Acceptance | index')



test('visiting /index', withChai(async function (expect) {
  await page.visit()

  expect(currentURL()).equal('/')

  const firstGroup = page.listGroups(0)

  const expectedTitleGroups = [
    ['Foo',  'Bar', 'Baz', 'Quux'],
    ['☰ Zomg', '☰ Lol'],
  ]

  expectedTitleGroups.forEach((expectedTitles, i) => {
    const list = firstGroup.lists(i)

    m = `List #${i} item count`
    expect(list.items().count, m).equal(expectedTitles.length)

    expectedTitles.forEach((expectedTitle, k) => {
      m = `List #${i} item #${k} content title`
      expect(list.items(k).content.title, m).equal(expectedTitle)
    })
  })
}))



test('sorting a list', withChai(async function (expect) {
  await page.visit()

  const list = page.listGroups(0).lists(0)

  await list.sort(0, 1, false)

  const expectedTitles = ['Bar', 'Foo', 'Baz', 'Quux']

  m = "List #0 items count"
  expect(list.items().count, m).equal(4)

  expectedTitles.forEach((expectedTitle, k) => {
    m = `List #0 item #${k} content title`
    expect(list.items(k).content.title, m).equal(expectedTitle)
  })
}))



test('sorting between lists', withChai(async function (expect) {
  await page.visit()

  const list0 = page.listGroups(0).lists(0)
  const list1 = page.listGroups(0).lists(1)

  await list0.move(0, list1, 1, false)

  const expectedTitles0 = ['Bar',  'Baz', 'Quux']
  const expectedTitles1 = ['☰ Zomg', '☰ Lol', '☰ Foo']

  m = "List #0 items count"
  expect(list0.items().count, m).equal(3)

  expectedTitles0.forEach((expectedTitle, k) => {
    m = `List #0 item #${k} content title`
    expect(list0.items(k).content.title, m).equal(expectedTitle)
  })

  m = "List #1 items count"
  expect(list1.items().count, m).equal(3)

  expectedTitles1.forEach((expectedTitle, k) => {
    m = `List #1 item #${k} content title`
    expect(list1.items(k).content.title, m).equal(expectedTitle)
  })
}))



test('disable sorting within a list when the determineForeignPositionAction parameter is given', withChai(async function (expect) {
  await page.visit()

  const list0 = page.listGroups(2).lists(0)

  await list0.sort(0, 1, false)

  const expectedTitles0 = ['Bar', 'Baz', 'Foo', 'Quux']

  // List with disabled sorting
  expectedTitles0.forEach((expectedTitle, k) => {
    m = `List #0 item #${k} content title`
    expect(list0.items(k).content.title, m).equal(expectedTitle)
  })
}))



test('dragging into a sortable list when the sourcelist has the determineForeignPositionAction parameter', withChai(async function (expect) {
  await page.visit()

  const list0 = page.listGroups(2).lists(0)
  const list1 = page.listGroups(2).lists(1)

  await list0.move(0, list1, 0, true)

  const expectedTitles0 = ['Baz', 'Foo', 'Quux']
  const expectedTitles1 = ['Bar', 'Zomg', 'Lol']

  // List with disabled sorting
  m = "List #0 items count"
  expect(list0.items().count, m).equal(3)

  // List with disabled sorting
  expectedTitles0.forEach((expectedTitle, k) => {
    m = `List #0 item #${k} content title`
    expect(list0.items(k).content.title, m).equal(expectedTitle)
  })

  m = "List #1 items count"
  expect(list1.items().count, m).equal(3)

  expectedTitles1.forEach((expectedTitle, k) => {
    m = `List #1 item #${k} content title`
    expect(list1.items(k).content.title, m).equal(expectedTitle)
  })
}))



test('sort into a list that has the determineForeignPositionAction parameter', withChai(async function (expect) {
  await page.visit()

  const list0 = page.listGroups(2).lists(0)
  const list1 = page.listGroups(2).lists(1)

  await list1.move(0, list0, 0, false)

  const expectedTitles0 = ['Bar', 'Baz', 'Foo', 'Quux', 'Zomg']
  const expectedTitles1 = ['Lol']

  // List with disabled sorting
  m = "List #0 items count"
  expect(list0.items().count, m).equal(5)

  // List with disabled sorting
  expectedTitles0.forEach((expectedTitle, k) => {
    m = `List #0 item #${k} content title`
    expect(list0.items(k).content.title, m).equal(expectedTitle)
  })

  m = "List #1 items count"
  expect(list1.items().count, m).equal(1)

  expectedTitles1.forEach((expectedTitle, k) => {
    m = `List #1 item #${k} content title`
    expect(list1.items(k).content.title, m).equal(expectedTitle)
  })
}))

test('sorting from an unsortable list to a sortable list, and then back into an unsortable list, should not change the position', withChai(async function (expect) {
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

  await wait()

  const expectedTitles0 = ['Bar', 'Baz', 'Foo', 'Quux']
  const expectedTitles1 = ['Zomg', 'Lol']

  // List with disabled sorting
  m = "List #0 items count"
  expect(list0.items().count, m).equal(expectedTitles0.length)

  // List with disabled sorting
  expectedTitles0.forEach((expectedTitle, k) => {
    m = `List #0 item #${k} content title`
    expect(list0.items(k).content.title, m).equal(expectedTitle)
  })

  m = "List #1 items count"
  expect(list1.items().count, m).equal(expectedTitles1.length)

  expectedTitles1.forEach((expectedTitle, k) => {
    m = `List #1 item #${k} content title`
    expect(list1.items(k).content.title, m).equal(expectedTitle)
  })
}))

test('sorting from an sortable list to an unsortable list should position alphabetically', withChai(async function (expect) {
  await page.visit()

  const list0 = page.listGroups(2).lists(0)
  const list1 = page.listGroups(2).lists(1)

  const item0_0 = list0.items(0)
  let item1_0 = list1.items(0)

  await item1_0.dragStart()
  await list0.dragEnter()
  await item0_0.dragOver(true)
  await item1_0.dragEnd()

  await wait()

  let expectedTitles0 = ['Bar', 'Baz', 'Foo', 'Quux', 'Zomg']
  let expectedTitles1 = ['Lol']

  // List with disabled sorting
  m = "List #0 items count"
  expect(list0.items().count, m).equal(expectedTitles0.length)

  // List with disabled sorting
  expectedTitles0.forEach((expectedTitle, k) => {
    m = `List #0 item #${k} content title`
    expect(list0.items(k).content.title, m).equal(expectedTitle)
  })

  m = "List #1 items count"
  expect(list1.items().count, m).equal(expectedTitles1.length)

  expectedTitles1.forEach((expectedTitle, k) => {
    m = `List #1 item #${k} content title`
    expect(list1.items(k).content.title, m).equal(expectedTitle)
  })

  item1_0 = list1.items(0)

  console.log(item1_0)

  await item1_0.dragStart()
  await list0.dragEnter()
  await item0_0.dragOver(true)
  await item1_0.dragEnd()

  await wait()

  expectedTitles0 = ['Bar', 'Baz', 'Foo', 'Lol', 'Quux', 'Zomg']
  expectedTitles1 = []

  // List with disabled sorting
  m = "List #0 items count"
  expect(list0.items().count, m).equal(expectedTitles0.length)

  // List with disabled sorting
  expectedTitles0.forEach((expectedTitle, k) => {
    m = `List #0 item #${k} content title`
    expect(list0.items(k).content.title, m).equal(expectedTitle)
  })

  m = "List #1 items count"
  expect(list1.items().count, m).equal(expectedTitles1.length)

  expectedTitles1.forEach((expectedTitle, k) => {
    m = `List #1 item #${k} content title`
    expect(list1.items(k).content.title, m).equal(expectedTitle)
  })
}))
