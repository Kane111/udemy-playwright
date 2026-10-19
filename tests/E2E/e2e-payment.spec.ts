import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { PaymentPage } from '../../page-objects/PaymentPage'
import { Navbar } from '../../page-objects/components/Navbar'

test.describe.only("New Payment", () => {
   
    let homePage: HomePage
    let loginPage: LoginPage
    let paymentPage: PaymentPage
    let navbar: Navbar

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        paymentPage = new PaymentPage(page)
        navbar = new Navbar(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login("username", "password")
    })

    test("Should send new payment", async ({ page }) => {
        // The band-aid solution, because currently the website does different things than it does for the teacher
        // And thus I am forced to use a workaround
        await paymentPage.goToAccountSummary()
        await navbar.clickOnTab("Pay Bills")
        await paymentPage.createPayment()
        await paymentPage.assertSuccessMessage()
    })
})