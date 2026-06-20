import { test, expect , request} from "@playwright/test";
import { APIutils } from "./utils/APIutils";

const loginpayload = {
    userEmail: "ankitguptapl19@gmail.com",
    userPassword: "Ankit19gids"
}

const orderpayload = {
   orders: [{
      country: "Pakistan",
      productOrderedId: "6960eae1c941646b7a8b3ed3"
   }]
}

let token
let orderid

test.use({headless:false})

test.beforeAll(async () =>
{
    const apiContext = await request.newContext();
    const apiutils = new APIutils(apiContext);
    token = await apiutils.getToken(loginpayload);
    orderid = await apiutils.createOrder(orderpayload, token);
})


test.beforeEach(()=>
{





})




test ('Client app login', async({page}) =>{


    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token)
    await page.goto("https://rahulshettyacademy.com/client")


await page.locator("button[routerLink*='myorders']").click()

await page.locator(".table-bordered tr th[scope='row']").first().waitFor()

const allids = await page.locator(".table-bordered tr th[scope='row']")
const idcount= await allids.count()
console.log(idcount)

for(let i =0;i<idcount;i++){
   const displayedOrderId = await allids.nth(i).textContent()
   console.log(displayedOrderId)

   if(displayedOrderId === orderid){
      console.log("The orderid is present = " + displayedOrderId)
      break
   }

}
})
