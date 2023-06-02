TERMII-JS
==============================================================================================================================

Termii-Js is a convenience Typescript/JavaScript library that provides an interface, which developers with an utmost love for everything JavaScript can leverage for a seamless interaction with the Termii platform [https://termii.com/](https://termii.com/).


## Setup

To use, first install:

```sh
npm install termii-js
```

or

```sh
yarn add termii-js
```

The library provides classes you can utilize in consuming some of the various APIs provided by Termii. These APIs are made available by the library as dedicated classes or as part of a root API.

## Usage

You can send a simple message like so:

```javascript
const termii = require("termii");
const termiiAPIInstance = termii.createTermiiAPIInstance("API_KEY_GOES_HERE"); // You can also use destructuring instead

(async () => {
  await termiiAPIInstance
    .message({
      to: "PHONE_NUMBER",
      from: "SENDER_ID",
      sms: "MESSAGE",
      channel: "generic"
    })
    .send();
})();
```