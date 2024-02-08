const { it } = require("node:test")

exports.itemOperators = class itemOperator {

    constructor(page) {
        this.page = page

        this.field_addItemToTodoList = page.getByPlaceholder('What needs to be done?')
        this.list_items = page.locator('.view')

        this.checkbox_item = page.locator('.toggle')

        this.btn_completed = page.getByRole('link', { name: 'Completed' })
        this.btn_active = page.getByRole('link', { name: 'Active' })
        this.btn_all = page.getByRole('link', { name: 'All' })

        this.count_activeItems = page.locator('.todo-count')

    }

    async gotoTodoPage() {
        await page.goto('https://todomvc.com/examples/knockoutjs/')
    }

    async addItemToList(itemName) {
        await this.field_addItemToTodoList.fill(itemName)
        await this.field_addItemToTodoList.press('Enter')
    }

    async getItemList() {
        const itemsList = await this.list_items.evaluateAll(items => items.map(item => item.textContent))
        return itemsList
    }

    async checkFirstItem() {
        await this.checkbox_item.nth(0).click()

    }

    async selectCompletedFilter() {

        await this.btn_completed.click()
    }

}