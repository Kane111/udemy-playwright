import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'



test.describe.only("Feedback Form", () => {

    let homePage: HomePage
    let feedbackPage: FeedbackPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)

        await homePage.visit()
        await homePage.clickOnFeedbackLink()
    })

    // Reset Feedback Form

test("Reset feedback form", async ({ page }) => {
   // We input all the things we want into the fields -- there are four of them
   feedbackPage.fillForm("name", "email@email.com", "subject", "message")

    // We click the "Clear" button to clear the fields
    await feedbackPage.resetForm()

    // To check that the fields are clear we need to get their contents, thus the constants and locators that grab the data
    // We check that those outputs are empty
    await feedbackPage.assertReset()

})

test("Submit Feedback", async ({ page }) => {
   // We input all the things we want into the fields -- there are four of them
   feedbackPage.fillForm("name", "email@email.com", "subject", "message")

    // Submit Form
    await feedbackPage.submitForm()
    await feedbackPage.feedbackFormSent()
})

})