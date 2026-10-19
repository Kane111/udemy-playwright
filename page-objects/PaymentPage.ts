import { expect, Locator, Page } from "@playwright/test"

export class PaymentPage {

    readonly page: Page
    readonly payeeSelectBox: Locator
    readonly payeeDetailButton: Locator 
    readonly payeeDetailBox: Locator
    readonly accountSelectBox: Locator 
    readonly amountInput: Locator  
    readonly dateInput: Locator     
    readonly descriptionInput: Locator 
    readonly submitPaymentButton: Locator   
    readonly message: Locator 

    // Additional band-aid solutions for my current interfacting issues
    readonly onlineBanking: Locator 
    readonly accountSummaryLink: Locator

    constructor(page: Page) {
        this.page = page
        this.payeeSelectBox = page.locator("#sp_payee")
        this.payeeDetailButton = page.locator("#sp_get_payee_details")
        this.payeeDetailBox = page.locator("#sp_payee_details")
        this.accountSelectBox = page.locator("#sp_account")
        this.amountInput = page.locator("#sp_amount")
        this.dateInput = page.locator("#sp_date")
        this.descriptionInput = page.locator("#sp_description")
        this.submitPaymentButton = page.locator("#pay_saved_payees")
        this.message = page.locator("#alert_content > span")

        // Additional band-aid solutions for my current interfacting issues
        this.onlineBanking = page.locator("#online-banking")
        this.accountSummaryLink = page.locator("#account_summary_link")
    }

    // Yet another band-aid intermediate solution because the dogshit website doesn't work the way it works for the teacher

    async goToAccountSummary() {
        await this.onlineBanking.click()
        await this.accountSummaryLink.click()
    }

    async createPayment() {
        await this.payeeSelectBox.selectOption("apple")
        await this.payeeDetailButton.click()
        await expect(this.payeeDetailButton).toBeVisible()
        await expect(this.payeeDetailBox).toContainText("Apple account")
        await this.accountSelectBox.selectOption("6")
        await this.amountInput.type("5000")
        await this.dateInput.type("2026-10-09")
        await this.descriptionInput.type("Some description")
        await this.submitPaymentButton.click()
        
    }

    async assertSuccessMessage() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText("The payment was successfully submitted.")
    }
}