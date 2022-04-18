/*
Copyright © Careem 2021, an Uber Technologies Inc. company

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License
*/

const express = require('express')
const axios = require('axios')
const FormData = require('form-data')
const app = express()
require('dotenv').config()

// The URLS are dynamically configured depending on your sandboxMode value
let identity_url = process.env.SANDBOX_ENABLED ? process.env.IDENTITY_SANDBOX_ENDPOINT : process.env.IDENTITY_PROD_ENDPOINT
let cpay_url = process.env.SANDBOX_ENABLED ? process.env.PAY_SANDBOX_ENDPOINT : process.env.PAY_PROD_ENDPOINT

app.use(express.json())

app.post('/', async (request, response) => {
    // STEP 0: Check if all at least amount, currency, and order ID are in.
    console.log("Checking paramters input.")
    try {
        if (request.body.invoiceId == null) {
            throw Error("request 'invoiceId' is missing.")
        }
        if (request.body.amount == null) {
            throw Error("request 'amount' is missing.")
        }
        if (request.body.currency == null) {
            throw Error("request 'currency' is missing.")
        }
        if (request.body.orderId == null) {
            throw Error("request 'orderId' is missing. Make sure it is a unique value.")
        }
    }
    catch (error) {
        console.log("Missing request paramters: " + error.message)
        response.status(400).send({
            "status": "FAILED",
            "details": "Missing request paramters",
            "message": error.message
        })
        return
    }

    console.log("Paramters are good. Initiating refund request.")

    // STEP 1: Initiate Auth 2.0 token request
    console.log("Initiating Auth 2.0 token request.")
    var auth_token = null
    try {
        // Composing form data for OAuth 2.0 token request.
        console.log("Composing form data for OAuth 2.0 token request.")
        var formData = new FormData();
        formData.append('client_id', process.env.CLIENT_ID)
        formData.append('client_secret', process.env.CLIENT_SECRET)
        formData.append('grant_type', 'client_credentials')

        // Firing Auth 2.0 token POST request
        var oauth_response = await axios.default.post(
            identity_url + "/token",
            formData,
            {
                headers: formData.getHeaders()
            }
        )
        console.log("Successfully obtained OAuth 2.0 token.")
        auth_token = oauth_response.data.access_token
    }
    catch (error) {
        console.log("Failed while attempting to obtain OAuth access token:" + error.message)
        response.status(400).send({
            "status": "FAILED",
            "details": "Failed while attempting to obtain OAuth access token.",
            "message": error.message
        })
    }

    // STEP 2: Initiate refund invoice request
    try {
        // Firing Generate Purchase Invoice request
        console.log("Sending Refund Invoice request")
        var invoice_response = await axios.default.post(
            cpay_url + "/wallet/merchants/invoices",
            {
                invoiceId: request.body.invoiceId,
                total: {
                    amount: Math.floor(request.body.amount * 100),
                    currency: request.body.currency
                },
                tags: {
                    orderId: {
                        type: "STRING",
                        value: request.body.orderId
                    }
                },
                refundToSource: true
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth_token,
                    'X-Idempotency-Key': request.body.orderId
                }
            }
        )
        // Invoice generated successfully. Return the redirection url
        console.log("Invoice generated successfully. Returning redirection url.")
        response.status(200).send({
            "status": "SUCCESS",
            "invoiceId": invoice_response.data.id,
            "orderId": request.body.orderId,
            "amount": request.body.amount,
            "currency": request.body.currency,
        })
    }
    catch (error) {
        console.log("Error while attempeting to refund invoice: " + error)
        response.status(400).send({
            "status": "FAILED",
            "details": "Failed while attempting to refund invoice.",
            "message": error
        })
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})