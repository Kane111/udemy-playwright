import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe("New Payment", () => {
   
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login("username", "password")
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