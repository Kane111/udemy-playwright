import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe("Transfer Funds and Make Payments", () => {
   
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login("username", "password")
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