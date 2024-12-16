import {test, expect} from '@playwright/test';
import data from '../testingData/testData.json';
import { NavigationPage} from '../dataDrivenProject/NavigationPage';

let navigateTo: NavigationPage

test.describe ('login and navigate test suite', ()=>{

    test.beforeEach(async({page})=> {

        await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
        await page.screenshot({path: 'screenShoots/loginPage.png'});
        await page.getByRole('textbox', {name: 'Username'}).fill(data.testDataList.login[0].Username);
        await page.getByRole('textbox', {name: 'Password'}).fill(data.testDataList.login[0].Password);
        await page.getByRole('button', {name: 'Sign in'}).click();
        expect((await page.title())).toEqual(data.testDataList.login[0].PageTitle);
        await page.screenshot({path: 'screenShoots/homePage.png'});
        navigateTo = new NavigationPage(page); // creating a global object for NavigationPage class
    
    })
    test('navigateToWebAppAndVerifyFirstTaskAndComfirmTagsInToDoColumn', async({page})=>{
    
        await navigateTo.gettingTextContentsFromElements(data.testDataList.testcase1[0]['app-type'], data.testDataList.
            testcase1[0].column,data.testDataList.testcase1[0].task);
        expect(navigateTo.listContentOfColumn).toContain(data.testDataList.testcase1[0].task); //verifying
        expect(navigateTo.listOfTags).toBe(`${data.testDataList.testcase1[0].tags[0]}${data.testDataList.testcase1[0].tags[1]}`); //comfirming
        await page.screenshot({path: 'screenShoots/webAppPage.png'});
        
    })
    test('navigateToWebAppAndVerifySecondTaskAndComfirmTagsInToDoColumn',async({page})=>{

        await navigateTo.gettingTextContentsFromElements(data.testDataList.testcase2[0]['app-type'], 
            data.testDataList.testcase2[0].column, data.testDataList.testcase2[0].task);
        console.log(navigateTo.listOfTags);
        expect(navigateTo.listContentOfColumn).toContain(data.testDataList.testcase2[0].task); //verifying
        expect(navigateTo.listOfTags).toBe(data.testDataList.testcase2[0].tags[0]); //comfirming
          
    
    })
    test('navigateToWebAppAndVerifyTaskAndComfirmTagsInProgressColumn', async({page})=>{

        await navigateTo.gettingTextContentsFromElements(data.testDataList.testcase3[0]['app-type'], 
            data.testDataList.testcase3[0].column, data.testDataList.testcase3[0].task);
        expect(navigateTo.listContentOfColumn).toContain(data.testDataList.testcase3[0].task); //verifying
        expect(navigateTo.listOfTags).toBe(data.testDataList.testcase3[0].tags[0]); //comfirming
        
    })
    test ('navigateToMobAppAndVerifyTaskAndComfirmTagsInToDoColumn', async({page})=>{
    
        await navigateTo.gettingTextContentsFromElements(data.testDataList.testcase4[0]['app-type'], 
            data.testDataList.testcase4[0].column, data.testDataList.testcase4[0].task);
        expect(navigateTo.listContentOfColumn).toContain(data.testDataList.testcase4[0].task); //verifying
        expect(navigateTo.listOfTags).toBe(data.testDataList.testcase4[0].tags[0]); //comfirming
        await page.screenshot({path: 'screenShoots/mobileAppPage.png'});
    
    })
    test('navigateToMobAppAndVerifyTaskAndComfirmTagsInProgressColumn', async({page})=>{

        await navigateTo.gettingTextContentsFromElements(data.testDataList.testcase5[0]['app-type'], 
            data.testDataList.testcase5[0].column, data.testDataList.testcase5[0].task);
        expect(navigateTo.listContentOfColumn).toContain(data.testDataList.testcase5[0].task); //verifying
        expect(navigateTo.listOfTags).toBe(`${data.testDataList.testcase5[0].tags[0]}${data.testDataList.testcase5[0].tags[1]}`); //comfirming
    
    })
    test('navigateToMobAppAndVerifyTaskAndComfirmTagsInDoneColumn',async({page})=>{

        await navigateTo.gettingTextContentsFromElements(data.testDataList.testcase6[0]['app-type'],
             data.testDataList.testcase6[0].column, data.testDataList.testcase6[0].task);
        expect(navigateTo.listContentOfColumn).toContain(data.testDataList.testcase6[0].task); //verifying
        expect(navigateTo.listOfTags).toBe(data.testDataList.testcase6[0].tags[0]); //comfirming
    
    })
    test.afterEach('tearDown', async({page})=> {
        page.close();
        
    })

})
