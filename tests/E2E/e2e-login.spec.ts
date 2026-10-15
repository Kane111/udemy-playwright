import { test, expect } from '@playwright/test'
import { LoginPage } from "../../page-objects/LoginPage.ts"

test.describe.parallel.only("Login / Logout Flow", () => {
    let loginPage: LoginPage
    // Before Hook

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    
    //New version
    await loginPage.visit()

    //Old version
    //await page.goto('https://en.wikipedia.org/wiki/Main_Page')
})

    // Negative Scenario 

    test("Negative Scenario for login", async ({ page }) => {
        await page.click("#signin_button")
        await loginPage.wrongLogin("invalid username", "invalid password")
        await loginPage.assertErrorMessage()
    })

    //Positive Scenario + Logout 

        test("Positive Scenario login for WebApp", async ({ page }) => {
            await page.click("#signin_button")
            await loginPage.login("username", "password")

            // A small workaround to make the following stuff work, because the video uses an earlier version of stuff
            // Which doesn't work for me, and I have to go manually where teacher gets by pressing 1 button
            // So, here we are anyway
            await page.click("#online-banking")
            await page.click("#account_summary_link")

            const accountSummaryTab = await page.locator("#account_summary_tab")
            await expect(accountSummaryTab).toBeVisible()

            await page.goto("http://zero.webappsecurity.com/logout.html")
            await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html")
    })
})