import { test, expect } from '@playwright/test'
import { hasUncaughtExceptionCaptureCallback } from 'process';

// Этот beforeEach будет выполняться для всех тестов
test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click()
});

test('Locator syntax rules', async ({ page }) => {
  // tag
  page.locator('input'); // лучше await, если потом планируешь действия
  // id
  await page.locator('#inputEmail1').click()
  // class
  page.locator('.shape-rectangle')
  // attribute
  page.locator('[placeholder="Email"]')
  // full class
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
  // combination of selectors
  page.locator('input[placeholder="Email"]#inputEmail1')
  // XPath (не рекомендовано, но если нужно)
  page.locator('//*[@id="inputEmail1"]') // у тебя был лишний слеш и скобки
  // by partial text match
  page.locator(':text("Using")') // закрыта скобка
  // by exact text match
  page.locator(':text-is("Using the Grid")') // закрыта скобка
});

test('User facing locators', async ({ page }) => {
  await page.getByRole('textbox', {name:"Email"}).first().click()
  await page.getByRole('button', {name:"Sign in"}).first().click()
  await page.getByLabel('Email').first().click()
  await page.getByPlaceholder('Jane Doe').click()
  await page.getByText('Using the Grid').click()
  await page.getByTestId('SignIn').click()
 // await page.getByTitle('IoT Dashboard').click()  
});

test('Locating child elements', async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  await page.locator('nb-card').getByRole('button', {name:("Sign In")}).first().click()
  await page.locator('nb-card').nth(3).first().getByRole('button').click()
})

test('Locating parent elements', async ({ page }) => {
  await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name:"Email"}).click() 
  await page.locator('nb-card', {has:page.locator('#inputEmail1')}) .getByRole('textbox', {name:"Email"}).click()
  await page.locator('nb-card').filter({hasText: "Basic Form"}) .getByRole('textbox', {name:"Email"}).click()
  await page.locator('nb-card').filter({has:page.locator('.status-danger')}) .getByRole('textbox', {name:"Password"}).click()
  await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}) .filter({hasText: "Sign In"})
      .getByRole('textbox', {name:"Email"}).click()
  await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name:"Email"}).click()
})

test('Reusing the locators', async ({ page }) => {  
  const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
  const emailField = basicForm.getByRole('textbox', {name:"Email"})
  
  await emailField.fill('test@test.com')
  await basicForm.getByRole('textbox', {name:"Password"}).fill('Wlcome123')
  await basicForm.getByRole('button').click()
  await expect(emailField).toHaveValue('test@test.com') 
})

test('Extracting values', async ({ page }) => { 
  //single text value
  const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
  const buttonText = await basicForm.getByRole('button').textContent()
  expect(buttonText).toEqual('Submit')

  // all text values (radio buttons)
  const allRadioLabels = await page.locator('nb-radio').allTextContents()
  expect(allRadioLabels).toContain('Option 1');


  //input values
  const emailField = basicForm.getByRole('textbox', {name:"Email"})
  await emailField.fill('test@test.com')
  const emailValue = await emailField.inputValue()
  expect(emailValue).toEqual('test@test.com')

  //attribute
  const placeholderValue = await emailField.getAttribute('placeholder')
  expect(placeholderValue).toEqual('Email')
})

test('Assertions', async ({ page }) => { 
  //general assertions
  const basicFormButton = page.locator('nb-card').filter({hasText: "Basic Form"}).locator('button')
  const text = await basicFormButton.textContent()
  expect(text).toEqual('Submit')

  //Locator assertion
  await expect(basicFormButton).toHaveText('Submit')

  //Soft Assertion
  await expect.soft(basicFormButton).toHaveText('Submit') //continue if test fail
  await basicFormButton.click()
})