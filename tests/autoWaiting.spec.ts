import { test, expect } from '@playwright/test'
//test.describe.configure({mode: 'parallel'})

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto(process.env.URL)
  await page.getByText('Button Triggering AJAX Request').click()  
 //testInfo.setTimeout(testInfo.timeout + 2000)
})
test('Auto waiting', async ({ page }) => {
    const successButton = page.locator('.bg-success') 
  //  await successButton.click() // playwright is waiting
  //  const text = await successButton.textContent() // playwright is waiting

 // const text = await successButton.allTextContents() //// playwright is not waiting
  // extra
  //await successButton.waitFor({state: "attached"})
  //  expect(text).toContain('Data loaded with AJAX get request.')
  await expect(successButton).toHaveText('Data loaded with AJAX get request.',{timeout: 20000})
})
test('Alternative waits', async ({ page }) => {
    const successButton = page.locator('.bg-success') 
    
    //__wait for element
   // await page.waitForSelector('.bg-success')

    //__wait for particular resonse
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //__wait for network calls to be completed (NOT RECOMMENDED)
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('Timeouts', async ({ page }) => {
    //test.setTimeout(10000)
   // test.slow()
    const successButton = page.locator('.bg-success') 
    await successButton.click()
})