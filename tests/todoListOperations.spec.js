// @ts-check
const { test, expect, mergeExpects } = require('@playwright/test');
import { count } from 'console';
import { itemOperators } from '../page/todo.js'

test.beforeEach(async ({ page }) => {
  await page.goto('https://todomvc.com/examples/knockoutjs/')
})

test.describe('adding item to the list', () => {

  test('add an item to the list', async ({ page }) => {

    const todoOps = new itemOperators(page)

    await todoOps.addItemToList('buy shoe')

    const todoItemsList = await todoOps.getItemList()

    await expect(todoItemsList[0]).toContain('buy shoe')
  })

  test('add two items to the list', async ({ page }) => {

    const todoOps = new itemOperators(page)

    await todoOps.addItemToList('get medicine')
    await todoOps.addItemToList('fill gas')

    const todoItemsList = await todoOps.getItemList()

    await expect(todoItemsList).toHaveLength(2)
    await expect(todoItemsList[0]).toContain('get medicine')
    await expect(todoItemsList[1]).toContain('fill gas')
  })
})

test.describe('apply filter', () => {
  test('show all active items', async ({ page }) => {

    const todoOps = new itemOperators(page)
    await todoOps.addItemToList('one')
    await todoOps.addItemToList('two')
    await todoOps.addItemToList('three')

    await todoOps.checkFirstItem()
    const allItemsList = await todoOps.getItemList()
    await expect(allItemsList).toHaveLength(3)

    await todoOps.selectCompletedFilter()

    const completedItemsList = await todoOps.getItemList()
    await expect(completedItemsList).toHaveLength(1)
  })

})

test.describe('marking items', () => {
  test('mark item as complete', async ({ page }) => {
    const todoOps = new itemOperators(page)
    await todoOps.addItemToList('Call Gurpreet')
    await todoOps.addItemToList('buy salt')

    await todoOps.checkFirstItem()

    await expect(todoOps.checkbox_item.nth(0)).toBeChecked();
    await expect(todoOps.checkbox_item.nth(1)).not.toBeChecked();

  })

  test('mark a completed item to active', async ({ page }) => {
    const todoOps = new itemOperators(page)
    await todoOps.addItemToList('Call Gurpreet')
    await todoOps.addItemToList('buy salt')

    await todoOps.checkFirstItem()
    await expect(todoOps.checkbox_item.nth(0)).toBeChecked();
    await expect(page.locator('.completed .view label')).toHaveCSS('text-decoration-line', 'line-through')
    await expect(todoOps.checkbox_item.nth(1)).not.toBeChecked();

    await todoOps.checkFirstItem()
    await expect(todoOps.checkbox_item.nth(0)).not.toBeChecked();
    await expect(todoOps.checkbox_item.nth(1)).not.toBeChecked();

  })

  test('check the items todo count field has correct value', async ({ page }) => {
    const todoOps = new itemOperators(page)
    await todoOps.addItemToList('charge batteries')
    await todoOps.addItemToList('car wash')

    await expect((todoOps.count_activeItems)).toContainText('2')
    await expect((todoOps.count_activeItems)).toContainText('items left')

    await todoOps.checkFirstItem()

    await expect(todoOps.count_activeItems).toContainText('1')
    await expect((todoOps.count_activeItems)).toContainText('item left')

  })

})