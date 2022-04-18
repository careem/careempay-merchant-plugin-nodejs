# Refund NodeJS 

This is an Express.js endpoint plugin that allows you to integrate with Careem Pay (CPay) Merchant API given only a client ID and Secret input in the `.env` file. 

Using this endpoint pluging, you can generate a refund a previously made Purchase by supplying the amount, currency, unique orderId, and the `invoiceId` of the previously made CPay payment.

## Prerequisites
- You need to be onboarded with CPay as a merchant.
- You need to have your client ID and client sercret from CPay


## Assumptions
This plugin assumes the following:
- The merchant have made a payment transaction using CPay before.
- The merchant have stored the invoice ID of the previously made payment.
- The merchant is using nodeJs


### Sample Request
```js
{
    "invoiceId": "88c7c475-3aaa-4456-ab78-ccebe91a2a6c",// The invoice ID of the previously made payment 
    "orderId": "d6e44bbe-757d-4854-8717-3412a9b74caa", // has to be unique orderId - Mandatory
    "amount": 143.22, // Enter the amount as it is - Mandatory
    "currency": "AED", // Currency of the amount - Mandatory
}
```
### Sample response
```js
{
    "status": "SUCCESS",
    "invoiceId": "02cf8de5-d051-42db-92a5-0751fa055834",
    "orderId": "d822338b-67c4-4db3-bf04-e25ec724806a",
    "amount": 143.22,
    "currency": "AED"
}
```

## API Parameters

### Request Parameters
| Field    | Type   | Required | Description                                         | Example                                  |
|----------|--------|----------|-----------------------------------------------------|------------------------------------------|
| orderId  | string | true     | a unique identifier for the order transaction       | EPAY20220211323432                       |
| amount   | number | true     | The total transaction amount                        | 32.99                                    |
| currency | string | true     | The ISO-4217 currency code                          | AED                                      |
| invoiceId| string | true     | The invoice ID of the previously made payment       | 02cf8de5-d051-42db-92a5-0751fa055834     |


### Response Parameters
| Field        | Type   | Description                                             | Possible Values/Example                                                                                   |
|--------------|--------|---------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| status       | string | The result of the API request                           | 'SUCCESS' \| 'FAILED'                                                                                     |
| invoiceId    | string | The phone number of the payer                           | +97123456789                                                                                              |
| orderId      | string | a unique identifier for the order transaction           | EPAY20220211323432                                                                                        |
| amount       | number | The total transaction amount                            | 32.99                                                                                                     |
| currency     | string | The ISO-4217 currency code                              | AED                                                                                                       |
| details      | string | the details of the cause of the error                   |                                                                                                           |
| message      | string | the error message thrown                                |                                                                                                           |
