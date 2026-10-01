import { test, expect } from '@playwright/test'

test.describe("Feedback Form", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/index.html")
        await page.click("#feedback")
    })

    // Reset Feedback Form

test("Reset feedback form", async ({ page }) => {
   // We input all the things we want into the fields -- there are four of them
    await page.type("#name", "some name")
    await page.type("#email", "someemail@email.com")
    await page.type("#subject", "some subject")
    await page.type("#comment", "some comment")

    // We click the "Clear" button to clear the fields
    await page.click("input[name='clear']")

    // To check that the fields are clear we need to get their contents, thus the constants and locators that grab the data
    const nameInput = await page.locator("#name")
    const commentInput = await page.locator("#comment")

    // We check that those outputs are empty
    await expect(nameInput).toBeEmpty()
    await expect(commentInput).toBeEmpty()
})


    // Submit Feedback Form
    test("Submit feedback form", async ({ page }) => {
    await page.type("#name", "some name")
    await page.type("#email", "someemail@email.com")
    await page.type("#subject", "some subject")
    await page.type("#comment", "some comment")

    await page.click("input[type='submit']")

    // Shorter version (trick) for execution of checking if the element is found on the Page (check if we have reached some step)
    // Effectively shorter version of assertion
    await page.waitForSelector('#feedback-title')


    })


})