import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage{
    // Define selectors 

    // readonly page: Page -- we no longer need it, because we're importing this from AbstractPage object
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator

    // Init selectors using constructor

    constructor(page: Page) {
        // this.page = page -- same as above
        // Super (or superconstructor) is a function where we call a constructor from a function we extend from
        // In this case, AbstractPage above, in export
        super(page)
        this.usernameInput = page.locator("#user_login")
        this.passwordInput = page.locator("#user_password")
        this.submitButton = page.locator("text=Sign in")
        this.errorMessage = page.locator(".alert-error")
    }

    // Define login page methods

    async login(username: string, password: string) {
        await this.usernameInput.type(username)
        await this.passwordInput.type(password)
        await this.submitButton.click()
        await this.page.waitForTimeout(500);
        await this.page.goBack()
    }

    // Need additional function without waiting for timeout and going back because wrong password and login don't fuck up the process to need it
    async wrongLogin(username: string, password: string) {
        await this.usernameInput.type(username)
        await this.passwordInput.type(password)
        await this.submitButton.click()
    }

    async assertErrorMessage() {
        await expect(this.errorMessage).toContainText("Login and/or password are wrong")
    }
}