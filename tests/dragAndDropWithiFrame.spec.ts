import {expect } from '@playwright/test';
import { test } from '../test-options'



test('Drag and drop with iframe', async ({ page, globalsQaURL }) => {
  await page.goto(globalsQaURL)
  const consentButton = page.getByRole('button', { name: 'Consent' });
  if (await consentButton.isVisible({ timeout: 5000 }).catch(() => false)) {
    await consentButton.click()
  }
  const iframe = page.frameLocator('[rel-title="Photo Manager"] iframe')  
  await iframe.locator('li', {hasText: "High Tatras 2"}).dragTo(iframe.locator('#trash'))
  await page.waitForTimeout(1000);

  //more presice control
  await iframe.locator('li', {hasText: "High Tatras 4"}).hover()
  await page.mouse.down()
  await iframe.locator('#trash').hover()
  await page.mouse.up()
  await page.waitForTimeout(1000);
  await expect(iframe.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 4"]);
})