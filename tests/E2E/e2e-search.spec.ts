import { test, expect } from '@playwright/test'

test.describe("Search Results", () => {
    test("Should find search results", async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/")
        await page.type("#searchTerm", "bank")
        await page.keyboard.press("Enter")
      
        const numberOfLinks = await page.locator("li > a")
        await expect(numberOfLinks).toHaveCount(2)
    })

    test("Nonsense search returns nothing", async ({ page }) => {
        // Go to website, type nonsense into search bar, press "Enter" Button
        await page.goto("http://zero.webappsecurity.com/")
        await page.type("#searchTerm", "adjksksajdsakdasldas")
        await page.keyboard.press("Enter")

        // Set up a constant "Number of links", which checks the number of search results ("a") as part of search result category ("li")
        // It must have a count of 0, because we do not expect anything to show up, unlike with normal search
        const numberOfLinks = await page.locator("li > a")
        await expect(numberOfLinks).toHaveCount(0)

        // Set up a "Page Title" constant to check for the Page Title
        // Check if that Page Title has a correct phrase
        // Check if there's a text we expect to find *anywhere* on the Page and that it's actually visible to user
        const pageTitle = await page.locator('h2')
        await expect(pageTitle).toContainText('Search Results:') 
        await expect(page.getByText('No results were found for the query:')).toBeVisible()

        // Click on brand title Button to go to homepage and check if we're actually there
        await page.click(".brand")
        await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html")
    })

})