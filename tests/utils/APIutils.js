import { expect } from "@playwright/test";

class APIutils {
    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async getToken(loginPayload) {
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            { data: loginPayload }
        );
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseBody = await loginResponse.json();
        console.log(loginResponseBody);
        const token = loginResponseBody.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload, token) {
        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: { Authorization: token },
            }
        );
        expect(orderResponse.ok()).toBeTruthy();
        const orderResponseBody = await orderResponse.json();
        console.log(orderResponseBody);
        const orderId = orderResponseBody.orders[0];
        console.log(orderId);
        return orderId;
    }
}

export { APIutils };
