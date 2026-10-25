import { test } from "@playwright/test"
import { HomePage } from "../../page-objects/HomePage"
import { LoginPage } from "../../page-objects/LoginPage"

test.describe.parallel("Login Page Visual Tests", () => {
    let homepage: HomePage
    let loginpage: LoginPage

    test.beforeEach(async ({ page }) => {
        homepage = new HomePage(page)
        loginpage = new LoginPage(page)

        await homepage.visit()
        await homepage.clickOnSignIn()
    })

    test("Login Form", async ({ page }) => {
        await loginpage.snapshotLoginForm()
    })

    test("Login Error Message", async ({ page }) => {
        await loginpage.wrongLogin("Fail", "Invalid")
        await loginpage.snapshotErrorMessage()
    })
})

// Command to update the Snapshots (if you need them updated): --update-snapshots