import { test, expect } from "@playwright/test"

test.describe.only("Tips and tricks Section", () => {
    test("TestInfo Object", async ({ page }, testInfo) => {
        await page.goto('https://www.example.com')
        // console.log(testInfo.expectedStatus)
    })

    test("Test Skip Browser", async ({ page, browserName }) => {
        test.skip(browserName === "chromium", "Feature not ready in Chrome browser")
        await page.goto('https://www.example.com')
    })

    test.only("Test FixMe Annotation", async ({ page, browserName }) => {
        test.fixme(browserName === "chromium", "Test is not stable, needs revision")
        // use intentionally broken link to use --retries=3 to check
        await page.goto('https://www.example.com')
    })
})