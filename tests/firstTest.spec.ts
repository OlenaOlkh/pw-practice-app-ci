import { test } from '@playwright/test'


// Этот beforeEach будет выполняться для всех тестов
test.beforeEach(async ({ page }) => {
  await page.goto('/')
});

test.describe('Suite1', () => {  
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click();
  });

  test('the first test', async ({ page }) => {
    await page.getByText('Form Layouts').click();
  });

  test('navigate to datepicker page', async ({ page }) => {
    await page.getByText('Datepicker').click();
  });
});
