import { test, expect } from '@playwright/test'

//allure generate ./allure-results -o ./allure-report --clean
//allure open ./allure-report


test('Input fields', async ({ page }, testInfo) => {
    await page.goto('/')
    if (testInfo.project.name == 'mobile'){
      await page.locator('.sidebar-toggle').click()
    }        
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()    
    if (testInfo.project.name == 'mobile'){
      await page.locator('.sidebar-toggle').click()
    }  
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" })
      .getByRole('textbox', { name: "Email" })
    await usingTheGridEmailInput.type('test@test.com',{delay: 200})
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially('test1@test.com', {delay: 500})   
  });