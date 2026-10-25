import { test, expect } from '@playwright/test'

test.describe.parallel.only("Visual Regression Testing Example", () => {
   
    // This is for entire Page Screenshot to form a Snapshot -- to compare the future Screenshots to that Snapshot
    // It will flag whatever inconsistencies happen with comparison of all pixels
    test("Full Page Snapshot", async ({ page }) => {
        await page.goto("https://www.example.com")
        expect(await page.screenshot()).toMatchSnapshot("homepage.png")
    })

    // Same as above in principle, but only doing that to a specific, defined thing
    test("Single Element Snapshot", async ({ page }) => {
        await page.goto("https://www.example.com")
        const pageElement = await page.locator('body > p[lang="en"]')
        expect(await pageElement.screenshot()).toMatchSnapshot("page-element-english.png")
    })

    test("Single Element Snapshot Wikipedia", async ({ page }) => {
        await page.goto("https://en.wikipedia.org/wiki/Wikipedia")
        const pageElementWikipedia = await page.$("h1")
        expect(await pageElementWikipedia.screenshot()).toMatchSnapshot("page-table-wikipedia.png")
    })

})

// Command to update the Snapshots (if you need them updated): --update-snapshots