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

    // Negative Scenario (Old, Wikipedia)

    test.skip("Negative Scenario for login", async ({ page }) => {
        await page.click("#pt-login-2")
        await page.type("#wpName1", "1232112312312")
        await page.type("#wpPassword1", "31231321312123")
        await page.click("#wpLoginAttempt")

        const errorMessage = page.locator(".cdx-message__content")
        await expect(errorMessage).toContainText("Incorrect username or password entered.")    
    })

    //Positive Scenario + Logout (old, Wikipedia)

    test.skip("Positive Scenario for login and logout", async ({ page }) => {
        
        // Logging in
        await page.click("#pt-login-2")
        await page.type("#wpName1", "KaneTest101")
        await page.type("#wpPassword1", "ip,Pt<3Pb-kL(!)")
        await page.click("#wpLoginAttempt")
    
        // Checking if the "Main Page" banner is visible
        const wikipediaMainPage = await page.locator("#mwBg")
        await expect(wikipediaMainPage).toBeVisible()

        // Clicking on the User dropdown, clicking logout button, checking if we're on the correct page past logout
        await page.click("#vector-user-links-dropdown-checkbox")
        await page.click("#pt-logout")
        await expect(page).toHaveURL("https://en.wikipedia.org/w/index.php?title=Special:UserLogout&returnto=Main+Page")

    })

        test("Positive Scenario login for WebApp", async ({ page }) => {
        await page.click("#signin_button")
        await page.type("#user_login", "username")
        await page.type("#user_password", "password")
        await page.click(".btn-primary")
        await page.waitForTimeout(500);
        await page.goto("http://zero.webappsecurity.com/index.html")
    })
})