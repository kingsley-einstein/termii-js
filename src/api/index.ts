import { MessageRequestInterface, MessagingAPI } from "./Messaging";
import { NumberRequestInterface, NumbersAPI } from "./Numbers";

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
}
