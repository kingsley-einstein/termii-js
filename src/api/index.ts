import { MessageRequestInterface, MessagingAPI } from "./Messaging";
import { NumberRequestInterface, NumbersAPI } from "./Numbers";
import { SenderIDAPI, SenderIDRequestInterface } from "./SenderID";
import { TemplateAPI, TemplateRequestInterface } from "./Template";

export class API {
  private apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public messaging(requestInterface: Omit<MessageRequestInterface, "api_key">) {
    const obj = Object.defineProperty(requestInterface, "api_key", { value: this.apiKey });
    return MessagingAPI.createMessagingInstance(obj as MessageRequestInterface);
  }

  public numbers(requestInterface: Omit<NumberRequestInterface, "api_key">) {
    const obj = Object.defineProperty(requestInterface, "api_key", { value: this.apiKey });
    return NumbersAPI.createNumberInstance(obj as NumberRequestInterface);
  }

  public senderID(requestInterface: Omit<SenderIDRequestInterface, "api_key">) {
    const obj = Object.defineProperty(requestInterface, "api_key", { value: this.apiKey });
    return SenderIDAPI.createSenderIDInstance(obj as SenderIDRequestInterface);
  }

  public template(requestInterface: Omit<TemplateRequestInterface, "api_key">) {
    const obj = Object.defineProperty(requestInterface, "api_key", { value: this.apiKey });
    return TemplateAPI.createTemplateInstance(obj as TemplateRequestInterface);
  }
}
