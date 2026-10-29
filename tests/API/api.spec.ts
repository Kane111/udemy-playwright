import { test, expect } from '@playwright/test'

test.describe.parallel("API Testing", () => {

    const baseUrl = "https://reqres.in/api"

    test.skip("Simple API Test - Assert Response Status", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/3`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
    })

    test.skip("Simple API Test - Assert Invalid Endpoint", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/nonexistent-endpoint`)
        expect(response.status()).toBe(404)
    })

    test.only("GET Request - Get User Detail", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/1`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        // The thing here after responseBody is .data because that's what the previously called console log told contains the data
        // If it were to be a different name, I'd have to use that
        expect(responseBody.data.id).toBe(1)
        expect(responseBody.data.first_name).toBe("George")
        expect(responseBody.data.last_name).toBe("Bluth")
        expect(responseBody.data.email).toBeTruthy()
    })
})