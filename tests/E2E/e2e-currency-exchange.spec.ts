import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe("E2E Purchase Currency", () => {

    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login("username", "password")
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