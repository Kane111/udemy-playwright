import { test, expect } from '@playwright/test'

test.describe.parallel("Visual Regression Testing Example", () => {
   
    test("Full Page Snapshot", async ({ page }) => {
        await page.goto("https://www.example.com")
        expect(await page.screenshot()).toMatchSnapshot("homepage.png")
    })

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

