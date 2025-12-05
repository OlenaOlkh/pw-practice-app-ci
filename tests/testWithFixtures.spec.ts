import { test} from '../test-options'
import {faker} from '@faker-js/faker'

test('Parametrized methods', async ({ pageManager}) => {   
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(/\s/g, '')}${faker.number.int(1000)}@test.com`;     
    await pageManager.onFormLayoutPage().submitUsingTheGridWithCredentialsAndSelectOptions(process.env.USERNAME,process.env.PASSWORD,'Option 1')    
    await pageManager.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
})