import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/)
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible()
});
//commands running tests
//npx playwright test --project=chromium --headed
//npx playwright test -g "has title" --project=chromium
//npx playwright test --project=chromium --trace on
//npx playwright test --project=chromium --debug
//test.skipp('has title', async ({ page }) => {
 // await page.goto('https://playwright.dev/');
//test.only('has title', async ({ page }) => {
 // await page.goto('https://playwright.dev/');