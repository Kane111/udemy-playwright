# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\example.spec.ts >> Custom Helpers
- Location: tests\example.spec.ts:98:6

# Error details

```
TimeoutError: page.waitForSelector: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('h5') to be visible

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - heading "Example Domain" [level=1] [ref=e3]
  - paragraph [ref=e4]: This domain is for use in documentation examples without needing permission. Avoid use in operations.
  - paragraph [ref=e5]:
    - link "Learn more" [ref=e6]:
      - /url: https://iana.org/domains/example
```

# Test source

```ts
  1 | export async function loadHomepage(page) {
  2 |     await page.goto("https://www.example.com")
  3 | }
  4 | 
  5 | export async function assertTitle(page) {
> 6 |     await page.waitForSelector('h5')
    |                ^ TimeoutError: page.waitForSelector: Timeout 15000ms exceeded.
  7 | }
```