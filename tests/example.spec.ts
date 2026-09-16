import { test, expect } from '@playwright/test'

test("Simple basic test", async ({ page }) => {
  await page.goto("https://example.com/")
  const pageTitle = await page.locator('h1')
  await expect(pageTitle).toContainText('Example Domain')
})

test("Clicking on Elements", async ({ page }) => {
  await page.goto("http://zero.webappsecurity.com/index.html")
  await page.click("#signin_button")
  await page.click("text=Sign in")

    const errorMessage = await page.locator(".alert-error")
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
}) 

test.skip("Selectors", async ({ page }) => {
  // text
  await page.click('text=some text')

  // CSS Selectors
  await page.click('button')
  await page.click('#id')
  await page.click('.class')

  // Only visible CSS Selector
  await page.click('.submit-button:visible')

  // Combinations
  await page.click('#username .first')

  // XPath
  await page.click('//button')
  
 } )


test.describe("My first test suite", () => {
  // The tag below can be used with following command (npx playwright test --grep @myTag) to execute only the tests that are marked with the tag. To execute the tests that are NOT marked with the tag, use the --grep-invert instead of --grep.
  test("Working with inputs @myTag", async ({ page }) => {
  await page.goto("http://zero.webappsecurity.com/index.html")
  await page.click("#signin_button")

  await page.type('#user_login', 'some username')
  await page.type('#user_password', 'some password')
  await page.click("text=Sign in")

    const errorMessage = await page.locator(".alert-error")
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.only("Assertions @myTag", async ({ page }) => {
  await page.goto('https://example.com/')
  await expect(page).toHaveURL("https://example.com/")
  await expect(page).toHaveTitle("Example Domain")

  const element = await page.locator('h1')
  await expect(element).toBeVisible()
  await expect(element).toHaveText("Example Domain")
  await expect(element).toHaveCount(1)

  const nonExistingElement = await page.locator('h5')
  await expect(nonExistingElement).not.toBeVisible() 

  await expect(element).not.toBeEmpty()
  await expect(element).toBeEnabled()
})
})