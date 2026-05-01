import { test, expect } from "@playwright/test";
import { text } from "node:stream/consumers";

test.use({headless:false})

const baseurl="https://rahulshettyacademy.com/client/"

async function EcommerceLogin(page){
   await page.goto(baseurl);
   await page.locator("#userEmail").fill("ankitguptapl19@gmail.com");
   await page.locator("#userPassword").fill("Ankit19gids");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
}
 
  
 
 
test('@Web Client App login', async ({ page }) => {
   await EcommerceLogin(page)
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);
  
 
})


test('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 })


 test.only("E2E Flow Scenario",async({browser}) =>{

   const context = await browser.newContext();
   const page = await context.newPage();
   const products=page.locator(".card-body")
   const productName = "ZARA COAT 3"

   await EcommerceLogin(page)
   await page.locator(".card-body").first().waitFor()
   const productcount= await products.count()

   for(let i = 0;i<productcount;i++){
      if(await products.nth(i).locator("b").textContent() == productName){
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click()
         break
         }
      

   }
   
   await page.locator("[routerlink*='cart']").click()
   await page.locator("h3:has-text('ZARA COAT 3')").waitFor()
   //await page.locator("div li").waitFor()
   
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
   expect(bool).toBeTruthy()

   await page.locator("text=Checkout").click()
   await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:150} )
   await page.locator("section.ta-results").waitFor()
   const dropdown =await page.locator("section.ta-results")
   const optionscount= await dropdown.locator("button").count()

   for(let i =0;i<optionscount;i++){
      const text = await dropdown.locator("button").nth(i).textContent()
      console.log(text)
      if(text===' India'){

         await dropdown.locator("button").nth(i).click()
         break

      }
   }

   const value = await page.locator("[placeholder*='Country']").inputValue()
   console.log(value)

   await expect(page.locator(".mt-5 label")).toHaveText("ankitguptapl19@gmail.com")
   await page.locator(".action__submit").click()

   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
   const id = await page.locator(".box label.ng-star-inserted").textContent()
   const arrayText = id.split(" ")
   const idonly = arrayText[2]
   console.log(idonly)


await page.locator("button[routerLink*='myorders']").click()

await page.locator(".table-bordered tr th[scope='row']").first().waitFor()

const allids = await page.locator(".table-bordered tr th[scope='row']")
const idcount= await allids.count()
console.log(idcount)

for(let i =0;i<idcount;i++){
   const orderid = await allids.nth(i).textContent()
   console.log(orderid)

   if(orderid === idonly){
      console.log("The orderid is present = " + orderid)
      break
   }

}
})



test("Getby locator practice", async({browser})=>{

const context = await browser.newContext()
const page = await context.newPage()

await page.goto("https://rahulshettyacademy.com/angularpractice/")
//await page.getByLabel("Name").fill("Ankit")
await page.getByLabel("Check me out if you Love IceCreams!").click()
await page.getByLabel("Employed").click()
await page.getByLabel("Gender").selectOption("Female")
await page.getByPlaceholder("Password").fill("Psswordpasted")
await page.getByRole("button",{name:'Submit'}).click()
await page.getByRole("link",{name:'Shop'}).click()
await page.locator("app-card").filter({hasText: 'Blackberry'}).getByRole("button").click()
await page.pause()



})