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
const termii = require("termii-js");
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

or like so:

```javascript
const { MessageAPI } = require("termii-js");

(async () => {
  await MessageAPI
    .createMessagingInstance({
      to: "PHONE_NUMBER",
      from: "SENDER_ID",
      sms: "MESSAGE",
      channel: "generic",
      api_key: "API_KEY_HERE"
    })
    .send();
})();
```

### Other available APIs

* NumbersAPI [https://www.developers.termii.com/number](https://www.developers.termii.com/number)

The NumbersAPI class provides the interface for the Termii `number` API. You can access it using the `numbers` function of the Termii API instance or you can import the class directly.

```javascript
// Removed for brevity
(async () => {
  await termiiAPIInstance
    .numbers({
      to: "PHONE_NUMBER",
      sms: "MESSAGE"
    })
})()
```

or

```javascript
const { NumbersAPI } = require("termii-js");

(async () => {
  await NumbersAPI
    .createNumberInstance({
      to: "PHONE_NUMBER",
      sms: "MESSAGE",
      api_key: "API_KEY_HERE"
    })
    .send();
})();
```

*Side note:* Notice that you do not need to set the `api_key` field if you're accessing an API from the root instance, which is where you set the API key (i.e the function argument).


* SenderIDAPI [https://www.developers.termii.com/sender-id](https://www.developers.termii.com/sender-id)

You can access the SendersIDAPI class using the `senderID` function of the root instance or by using the static `createSenderIDInstance` function exposed by the class itself. Use the link attached to this section to know how this instance can be configured. Remember that you only need to provide the API key again if you're not accessing from the root API instance. The non-static functions available in this class are `fetchSenderID` and `requestSenderID`