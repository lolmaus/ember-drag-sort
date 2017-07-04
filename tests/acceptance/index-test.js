import { test } from 'qunit'
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance'
import page from 'dummy/tests/pages/index'
import { withChai } from 'ember-cli-chai/qunit'


let m



moduleForAcceptance('Acceptance | index')



test('visiting /index', withChai(async function (expect) {
  await page.visit()

  expect(currentURL()).equal('/')

  const firstGroup = page.listGroups(0)

  const expectedTitleGroups = [
    ['Foo',  'Bar', 'Baz', 'Quux'],
    ['Zomg', 'Lol'],
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
  const expectedTitles1 = ['Zomg', 'Lol', 'Foo']

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



test('disable sorting within a list', withChai(async function (expect) {
  await page.visit()

  const list0 = page.listGroups(2).lists(0)
  const list1 = page.listGroups(2).lists(1)

  await list0.sort(0, 1, false)
  await list0.sort(2, 3, false)
  await list1.sort(0, 1, false)

  const expectedTitles0 = ['Foo', 'Bar', 'Baz', 'Quux']
  const expectedTitles1 = ['Lol', 'Zomg']

  // List with disabled sorting
  expectedTitles0.forEach((expectedTitle, k) => {
    m = `List #0 item #${k} content title`
    expect(list0.items(k).content.title, m).equal(expectedTitle)
  })

  // List without disabled sorting
  expectedTitles1.forEach((expectedTitle, k) => {
    m = `List #1 item #${k} content title`
    expect(list1.items(k).content.title, m).equal(expectedTitle)
  })
}))
