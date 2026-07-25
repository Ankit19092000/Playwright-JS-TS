import { test, expect } from "@playwright/test";
import { LoginPage } from "./pageobjects/LoginPage.js";

test.use({headless:false})

const baseurl="https://rahulshettyacademy.com/client/"
async function EcommerceLogin(page){
    await page.goto(baseurl);
    const loginPage = new LoginPage(page);
    await loginPage.validLogin("ankitguptapl19@gmail.com","Ankit19gids");
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    
 }

test("E2E Flow Scenario",async({browser}) =>{

    const context = await browser.newContext();
    const page = await context.newPage();
    const products=page.locator(".card-body")
    const productName = "ZARA COAT 3"
 
    await EcommerceLogin(page)
    await page.locator(".card-body").first().waitFor()
    const productcount= await products.count()
 
    // for(let i = 0;i<productcount;i++){
    //    if(await products.nth(i).locator("b").textContent() == productName){
    //       //add to cart
    //       await products.nth(i).locator("text= Add To Cart").click()
    //       break
    //       }
       
 
    // }

    await page.locator(".card-body")
        .filter({hasText:productName})
        .getByRole("button",{name:" Add To Cart"})
        .click();


    
    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click()
    await page.getByText("ZARA COAT 3").waitFor()
    //await page.locator("div li").waitFor()
    
    const bool = await page.getByText("ZARA COAT 3").isVisible()
    expect(bool).toBeTruthy()
 
    await page.getByRole("button",{name:"Checkout"}).click()
    await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:150} )
    
    await page.locator("section.ta-results").waitFor()
    await page.getByText("India").nth(1).click()
    // await page.locator("section.ta-results").waitFor()
    // const dropdown =await page.locator("section.ta-results")
    // const optionscount= await dropdown.locator("button").count()
 
    // for(let i =0;i<optionscount;i++){
    //    const text = await dropdown.locator("button").nth(i).textContent()
    //    console.log(text)
    //    if(text===' India'){
 
    //       await dropdown.locator("button").nth(i).click()
    //       break
 
    //    }
    // }
 
    const value = await page.locator("[placeholder*='Country']").inputValue()
    console.log(value)
 
    await expect(page.locator(".mt-5 label")).toHaveText("ankitguptapl19@gmail.com")
    await page.getByText("PLACE ORDER").click()
 
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
    const id = await page.locator(".box label.ng-star-inserted").textContent()
    const arrayText = id.split(" ")
    const idonly = arrayText[2]
    console.log(idonly)
 
 
 await page.getByRole("listitem").getByRole("button",{name:"ORDERS"}).click()
 
 await page.locator(".table-bordered tr th[scope='row']").first().waitFor()
 
//  const allids = await page.locator(".table-bordered tr th[scope='row']")
//  const idcount= await allids.count()
//  console.log(idcount)
 
//  for(let i =0;i<idcount;i++){
//     const orderid = await allids.nth(i).textContent()
//     console.log(orderid)
 
//     if(orderid === idonly){
//        console.log("The orderid is present = " + orderid)
//        break
//     }
 
//  }


await page.getByText(idonly).first().waitFor()
const boolean = await page.getByText(idonly).isVisible()
expect(boolean).toBeTruthy()
 })