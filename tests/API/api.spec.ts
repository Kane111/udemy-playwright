import { test, expect } from '@playwright/test'

test.describe.parallel("API Testing", () => {

    const baseUrl = "https://reqres.in/api"
    // This is my free API key from reqres: it doesn't work without it
    const apiKey = "reqres_8426597ad6ac462699201173b0d28205"

    test("Simple API Test - Assert Response Status", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/3`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
    })

    test("Simple API Test - Assert Invalid Endpoint", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/nonexistent-endpoint`)
        expect(response.status()).toBe(404)
    })

    test("GET Request - Get User Detail", async ({ request }) => {
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

    test("POST Request - Create New User", async ({ request }) => {
        const response = await request.post(`${baseUrl}/user`, {
            // This is how to insert the API key in the test that needs it so that I can actually use it
            headers: { 'x-api-key': apiKey },
            data:{
                id: 1000,
            },
        })

        const responseBody = JSON.parse(await response.text())
        expect(responseBody.id).toBe(1000)
        expect(responseBody.createdAt).toBeTruthy()
    })

    test("POST Request - Login", async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
        data: {
            email: "eve.holt@reqres.in",
            password: "cityslicka",
            },
        })
        
        const responseBody = JSON.parse(await response.text())
        expect (response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()
    })

    test("POST Request - Login Fail", async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
        data: {
            email: "eve.holt@reqres.in",
            },
        })
        
        const responseBody = JSON.parse(await response.text())
        expect (response.status()).toBe(400)
        expect(responseBody.error).toBe("Missing password")
    })

    test("PUT Request - Update user", async ({ request }) => {
        const response = await request.put(`${baseUrl}/users/2`, {
            data: {
                headers: { 'x-api-key': apiKey },
                name: "new name",
                job: "new job",
            },
        })

        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe("new name")
        expect(responseBody.job).toBe("new job")
        expect(responseBody.updatedAt).toBeTruthy()
    })
})