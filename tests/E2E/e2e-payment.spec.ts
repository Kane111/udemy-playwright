import { test, expect } from '@playwright/test'

test.describe.only("New Payment", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/index.html")
        await page.click("#signin_button")
        await page.type("#user_login", "username")
        await page.type("#user_password", "password")
        await page.click(".btn-primary")
        await page.waitForTimeout(500);
        await page.goto("http://zero.webappsecurity.com/index.html")
    })

    test("Should send new payment", async ({ page }) => {
        await page.click("#online-banking")
        await page.click("#pay_bills_link")
        await page.selectOption("#sp_payee", "apple")
        await page.click(".icon-question-sign")
        const payeeDetails = await page.locator("#sp_payee_details")
        await expect(payeeDetails).toBeVisible()
        await expect(payeeDetails).toContainText("Apple account")
        await page.selectOption("#sp_account", "6")
        await page.type("#sp_amount", "5000")
        await page.type("#sp_date", "2026-10-09")
        await page.type("#sp_description", "Some description")
        await page.click("#pay_saved_payees")
        
        const successMessage = await page.locator("#alert_content > span")
        await expect(successMessage).toBeVisible()
        await expect(successMessage).toContainText("The payment was successfully submitted.")
    })
})