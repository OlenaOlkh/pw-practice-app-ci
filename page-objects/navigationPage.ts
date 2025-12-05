import { Locator, Page } from "playwright/test"
import { HelperBase } from "./helperBase"

export class NavigationPage extends HelperBase {
  //  readonly page: Page

    
    constructor(page: Page){
       // this.page = page
       super(page)
    }
    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
        await this.waitForNumbersOfSeconds(2)
    }
    async datePickerPage (){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click();
    }
    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }
    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }
    async tooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }
    private async selectGroupMenuItem(groupItemTitle:string){
        const groupMenuTitle = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuTitle.getAttribute('aria-expanded')
        if(expandedState == "false"){
            await groupMenuTitle.click()
        }
    }
}