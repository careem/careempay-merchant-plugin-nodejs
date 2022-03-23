DISCLAIMER: This project is experimental and the APIs are not considered stable.

# Careem Pay Merchant Plugins - NodeJS

This repository contain server code plugins to simplify integration with Careem Pay Merchant API. These allow merchants to just plug-in their credentials into the endpoint's `.env` in order to use CPay Merchant APIs, reducing the coding required.

## Prerequisites 
You need to have the following installed in order to be able to test the endpoint on localhost:
- NodeJS
- NPM or Yarn
- Postman

And you need to be onboarded with CPay as a merchant, and have obtained your client ID and client sercret.


## Instructions
The repo contains only the source code of the endpoints, without their `node_modules` dependecies. Therefore, you need to run the following commands, at the root of the code sample (where index.js is), after cloning in order to install the requried dependecies:
```
npm install
```
or
```
yarn
```

Then run the following command in order to simulate the endpoint on localhost:
```
npm start
```
or
```
yarn start
```

Then you can use Postman to call the endpoint and test it out.


## Contribution
If you are interested in improving this plugin and contributing, please refer to our [contrubution guidelines](https://github.com/careem/careempay-merchant-plugin-nodejs/blob/master/CONTRIBUTION.md). 
