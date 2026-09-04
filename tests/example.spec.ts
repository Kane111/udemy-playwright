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

test("Selectors", async ({ page }) => {
  // text
  await page.click('text=some text')

  // CSS Selectors
  await page.click('button')
  await page.click('#id')
  await page.click('.class')

  //Only visible CSS Selector
  await page.click('.submit-button:visible')

  //Combinations
  await page.click('#username .first')

  // XPath
  await page.click('//button')
} )