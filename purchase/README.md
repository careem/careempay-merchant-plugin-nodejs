# Purchase NodeJS 

This is an Express.js endpoint plugin that allows you to integrate with Careem Pay (CPay) Merchant API given only a client ID and Secret input in the `.env` file. 

Using this endpoint pluging, you can generate a CPay Purchase request by supplying only an amount, currency, and a unique orderId at a minimum. This endpoint also allows you to supply the user's email, phone, or id to be saved by the CPay API. 

## Prerequisites
- You need to be onboarded with CPay as a merchant.
- You need to have your client ID and client sercret from CPay


## Assumptions
This plugin assumes the following:
- The merchant only require a simple payment transaction, as opposed to auth and capture
- The merchant is using nodeJs


### Sample Request
```js
{
    "orderId": "d6e44bbe-757d-4854-8717-3412a9b74caa", // has to be unique orderId - Mandatory
    "amount": 143.22, // Enter the amount as it is - Mandatory
    "currency": "AED", // Currency of the amount - Mandatory
    "email": "john.appleseed@email.com", // You may supply the user's email - Optional
    "phone": "+97123456789", // You may supply the user's phone number - Optional
    "userId": "we134132134918hfuen" // You may supply the user's id - Optional
}
```
### Sample response
```js
{
    "status": "SUCCESS",
    "instructions": "Use 'webRedirect' url for web checkout. Or use 'appRedirect' url for app checkout.",
    "webRedirect": "https://checkout.sandbox.cpay.me?invoiceId=60d5348e-7b98-46ac-8c56-fd3131209689",
    "appRedirect": "http://sagateway.careem-internal.com/wallet/users/payments?invoiceId=60d5348e-7b98-46ac-8c56-fd3131209689",
    "invoiceId": "60d5348e-7b98-46ac-8c56-fd3131209689",
    "orderId": "d6e44bbe-757d-4854-8717-3412a9b74caa",
    "amount": 143.22,
    "currency": "AED",
    "email": "john.appleseed@email.com", // You may supply the user's email - Optional
    "phone": "+97123456789", // You may supply the user's phone number - Optional
    "userId": "we134132134918hfuen"
}
```

## API Parameters

### Request Parameters
| Field    | Type   | Required | Description                                   | Example            |
|----------|--------|----------|-----------------------------------------------|--------------------|
| orderId  | string | true     | a unique identifier for the order transaction | EPAY20220211323432 |
| amount   | number | true     | The total transaction amount                  | 32.99              |
| currency | string | true     | The ISO-4217 currency code                    | AED                |
| email    | string | false    | The email address of the payer                | john@email.com     |
| phone    | string | false    | The phone number of the payer                 | +97123456789       |
| userId   | string | false    | The user identifier of the payer              | ACCT32413431       |

### Response Parameters
| Field        | Type   | Description                                             | Possible Values/Example                                                                                   |
|--------------|--------|---------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| status       | string | The result of the API request                           | 'SUCCESS' \| 'FAILED'                                                                                     |
| instructions | string | instruction on how to handle the returned URLs          |                                                                                                           |
| webRedirect  | string | The URL redirecting the payer to CPay on browser        | https://checkout.sandbox.cpay.me?invoiceId=60d5348e-7b98-46ac-8c56-fd3131209689                           |
| appRedirect  | string | The URL redirecting the payer to CPay on the Careem App | http://sagateway.careem-internal.com/wallet/users/payments?invoiceId=60d5348e-7b98-46ac-8c56-fd3131209689 |
| invoiceId    | string | The phone number of the payer                           | +97123456789                                                                                              |
| orderId      | string | a unique identifier for the order transaction           | EPAY20220211323432                                                                                        |
| amount       | number | The total transaction amount                            | 32.99                                                                                                     |
| currency     | string | The ISO-4217 currency code                              | AED                                                                                                       |
| email        | string | The email address of the payer                          | john@email.com                                                                                            |
| phone        | string | The phone number of the payer                           | +97123456789                                                                                              |
| userId       | string | The user identifier of the payer                        | ACCT32413431                                                                                              |
| details      | string | the details of the cause of the error                   |                                                                                                           |
| message      | string | the error message thrown                                |                                                                                                           |
