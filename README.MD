TERMII-JS
==============================================================================================================================

Termii-Js is a convenience Typescript/JavaScript library that provides an interface, which developers with an utmost love for everything JavaScript can leverage for a seamless interaction with the Termii platform [https://termii.com/](https://termii.com/).


## Setup

To use, first install:

```sh
npm install @lonely_dev/termii-js
```

or

```sh
yarn add @lonely_dev/termii-js
```

The library provides classes you can utilize in consuming some of the various APIs provided by Termii. These APIs are made available by the library as dedicated classes or as part of a root API.

## Usage

You can send a simple message like so:

```javascript
const termii = require("@lonely_dev/termii-js");
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
const { MessageAPI } = require("@lonely_dev/termii-js");

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
const { NumbersAPI } = require("@lonely_dev/termii-js");

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


* TemplateAPI [https://www.developers.termii.com/templates](https://www.developers.termii.com/templates)

You can access the TemplateAPI class using the `template` function of the root instance or by using the static `createTemplateInstance` function exposed by the class itself.


#### Tokens

You can also access the tokens APIs by using the `tokens` variable of the root instance. 

```javascript
const tokens = termiiAPIInstance.tokens;
```

Each token API also has a dedicated class. The classes provided include: `EmailTokenAPI`, `SendTokenAPI`, `VoiceCallAPI` and `VoiceTokenAPI`. They can be accessed like so:

```javascript
(async () => {
  await tokens.sendToken({ /* See docs for how to configure send token*/}).send();
  await tokens.voiceToken({ /* See docs for how to configure voice token*/}).send();
  await tokens.emailToken({ /* See docs for how to configure email token*/}).send();
  await tokens.voiceCall({ /* See docs for how to configure send call*/}).send();
})()
```

You can even access them through static functions.


```javascript
(async () => {
  SendTokenAPI.createSendTokenInstance({/* See docs for how to configure send token*/}).send();
  VoiceTokenAPI.createVoiceTokenInstance({/* See docs for how to configure voice token*/}).send();
  EmailTokenAPI.createEmailTokenInstance({/* See docs for how to configure email token*/}).send();
  VoiceCallAPI.createVoiceCallInstance({/* See docs for how to configure voice call*/}).send();
})()
```