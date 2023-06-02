import { assign, create } from "lodash";
import { MessageRequestInterface, MessagingAPI } from "./Messaging";
import { NumberRequestInterface, NumbersAPI } from "./Numbers";
import { SenderIDAPI, SenderIDRequestInterface } from "./SenderID";
import { TemplateAPI, TemplateRequestInterface } from "./Template";
import { SendTokenAPI, SendTokenRequestInterface } from "./token";

export class API {
  private apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public messaging(requestInterface: Omit<MessageRequestInterface, "api_key">) {
    const obj = assign(requestInterface, { api_key: this.apiKey });
    return MessagingAPI.createMessagingInstance(obj);
  }

  public numbers(requestInterface: Omit<NumberRequestInterface, "api_key">) {
    const obj = assign(requestInterface, { api_key: this.apiKey });
    return NumbersAPI.createNumberInstance(obj);
  }

  public senderID(requestInterface: Omit<SenderIDRequestInterface, "api_key">) {
    const obj = assign(requestInterface, { api_key: this.apiKey });
    return SenderIDAPI.createSenderIDInstance(obj);
  }

  public template(requestInterface: Omit<TemplateRequestInterface, "api_key">) {
    const obj = assign(requestInterface, { api_key: this.apiKey });
    return TemplateAPI.createTemplateInstance(obj);
  }

  public get tokens() {
    return create({
      sendToken: (requestInterface: Omit<SendTokenRequestInterface, "api_key">) => {
        const obj = assign(requestInterface, { api_key: this.apiKey });
        return SendTokenAPI.createSendTokenInstance(obj);
      }
    });
  }
}
