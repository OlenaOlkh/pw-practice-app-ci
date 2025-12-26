import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'
import { argosScreenshot } from "@argos-ci/playwright"


test.beforeEach(async ({ page }) => {
    await page.goto('/')
})
//npx playwright test --project=chromium --grep "@smoke" 
test('Navigate to form page @smoke', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
    await page.waitForTimeout(1000)
})
//
test('Parametrized methods', async ({ page }) => {
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(/\s/g, '')}${faker.number.int(1000)}@test.com`;

    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutPage().submitUsingTheGridWithCredentialsAndSelectOptions(process.env.USERNAME,process.env.PASSWORD,'Option 1')
    await page.screenshot({path: 'screenshots/formLayoutsPage.png'})
   // const buffer = await page.screenshot()
  //  console.log(buffer.toString('base64'))
    await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
    await page.locator('nb-card', {hasText: "Inline Form"}).screenshot({path: 'screenshots/inlineForm.png'})

    })
   // await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox('John Smith', 'smith@test.com', true)
   // await pm.navigateTo().datePickerPage()
   // await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10)
   // await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 15)
   // await page.waitForTimeout(1000)
   test.only('testing with argos ci', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await argosScreenshot(page, "form layouts page");
    await pm.navigateTo().datePickerPage()
    await argosScreenshot(page, "datepicker page");
    })
