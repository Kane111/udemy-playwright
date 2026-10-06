import { test, expect } from '@playwright/test'

test.describe.only("Transfer Funds and Make Payments", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/index.html")
        await page.click("#signin_button")
        await page.type("#user_login", "username")
        await page.type("#user_password", "password")
        await page.click(".btn-primary")
        await page.waitForTimeout(500);
        await page.goto("http://zero.webappsecurity.com/index.html")
        
    })

    test("Transfer funds", async ({ page }) => {
        await page.click("#transfer_funds_link")
        await page.selectOption("#tf_fromAccountId", "2")
        await page.selectOption("#tf_toAccountId", "3")
        await page.type("#tf_amount", "500")
        await page.type("#tf_description", "Test message")
        await page.click("#btn_submit")

        const boardHeader = await page.locator("h2.board-header")
        await expect(boardHeader).toContainText("Verify")
        
        const fromAccount = await page.locator("#tf_fromAccountId")
        const toAccount = await page.locator("#tf_toAccountId")
        const amount = await page.locator("#tf_amount")
        const description = await page.locator("#tf_description")

        await expect(fromAccount).toHaveValue("Checking")
        await expect(toAccount).toHaveValue("Savings")
        await expect(amount).toHaveValue("500")
        await expect(description).toHaveValue("Test message")

        await page.click("#btn_submit")

        const successMessage = await page.locator(".alert-success")
        await expect(successMessage).toContainText("You successfully submitted your transaction.")

    })
})