import { expect, Page } from "@playwright/test";

export class NavigationPage {
    readonly page: Page;
    listOfTags: string ;
    listContentOfColumn: string;
    constructor(page: Page){
        this.page = page;

    }
    async gettingTextContentsFromElements(appType: string, columnName: string , task: string){
        //
        await this.page.locator('[class="font-medium"]', {hasText:appType}).click();
        const columnLocator= this.page.locator('[class="flex flex-col w-80 bg-gray-50 rounded-lg p-4"]').
        filter({hasText: columnName});
        this.listContentOfColumn = await columnLocator.evaluateAll(elements => elements.map(element => 
            element.textContent || '').join(' '));
        console.log(this.listContentOfColumn);// printing  the list of elements in a column
        const tagsLocator = columnLocator.locator('.gap-3').locator('div', {hasText: task}).
          locator('[class="flex flex-wrap gap-2 mb-3"]');
        this.listOfTags = await tagsLocator.evaluateAll(elements => elements.map(element => 
        element.textContent || '').join(' '));
        console.log(this.listOfTags); // printing a list of tags in a given task
        
        
    }
}