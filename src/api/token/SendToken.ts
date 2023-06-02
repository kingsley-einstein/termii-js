import { replace } from "lodash";
import { BaseTokenAPI, BaseTokenAPIRequestInterface } from "./BaseToken";
import axios from "axios";

export interface SendTokenRequestInterface extends BaseTokenAPIRequestInterface {
  message_type: "NUMERIC" | "ALPHANUMERIC";
  to: string;
  from: string;
  channel: "dnd" | "WhatsApp" | "generic" | "email";
  pin_placeholder: string;
  message_text: string;
}

type SendTokenResponse = {
  smsStatus: string;
  to: string;
  pinId: string;
};

export class SendTokenAPI extends BaseTokenAPI {
  private apiKey: string;
  private pinLength: number;
  private pinAttempts: number;
  private pinTimeToLive: number;
  private messageType: "NUMERIC" | "ALPHANUMERIC";
  private to: string;
  private from: string;
  private channel: "dnd" | "WhatsApp" | "generic" | "email";
  private pinPlaceholder: string;
  private messageText: string;

  constructor(requestInterface: SendTokenRequestInterface) {
    super();
    this.baseUrl = replace(this.baseUrl, ":type", "sms").concat("/otp/send");
    this.apiKey = requestInterface.api_key;
    this.pinLength = requestInterface.pin_length;
    this.pinAttempts = requestInterface.pin_attempts;
    this.pinTimeToLive = requestInterface.pin_time_to_live;
    this.messageType = requestInterface.message_type;
    this.to = requestInterface.to;
    this.from = requestInterface.from;
    this.channel = requestInterface.channel;
    this.pinPlaceholder = requestInterface.pin_placeholder;
    this.messageText = requestInterface.message_text;
  }

  public static createSendTokenInstance(requestInterface: SendTokenRequestInterface) {
    return new SendTokenAPI(requestInterface);
  }

  public async send() {
    return axios
      .post<SendTokenResponse>(this.baseUrl, {
        api_key: this.apiKey,
        message_type: this.messageType,
        pin_length: this.pinLength,
        pin_attempts: this.pinAttempts,
        to: this.to,
        from: this.from,
        channel: this.channel,
        pin_time_to_live: this.pinTimeToLive,
        pin_placeholder: this.pinPlaceholder,
        message_text: this.messageText
      })
      .then((res) => res.data);
  }
}
