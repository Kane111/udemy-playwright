import { test, expect } from '@playwright/test'

test.describe.only("E2E Purchase Currency", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/index.html")
        await page.click("#signin_button")
        await page.type("#user_login", "username")
        await page.type("#user_password", "password")
        await page.click(".btn-primary")
        await page.waitForTimeout(500);
        await page.goto("http://zero.webappsecurity.com/index.html")
    })

    test("Purchase Currency", async ({ page }) => {
        await page.click("#online-banking")
        await page.click("#pay_bills_link")
        await page.click("text=Purchase Foreign Currency")
        await page.selectOption("#pc_currency", "EUR")
        const sellRateEuro = await page.locator("#sp_sell_rate")
        await expect(sellRateEuro).toBeVisible
        await expect(sellRateEuro).toContainText("EUR")
        await page.type("#pc_amount", "500")
        await page.click("#pc_inDollars_true")
        await page.click("#pc_calculate_costs")
        const conversionAmount = await page.locator("#pc_conversion_amount")
        await expect(conversionAmount).toContainText("EUR")
        await expect(conversionAmount).toContainText("500")
        await page.click("#purchase_cash")
        const purchaseSuccessful = await page.locator("#alert_content")
        await expect(purchaseSuccessful).toBeVisible()
        await expect(purchaseSuccessful).toContainText("Foreign currency cash was successfully purchased.")
    })

})