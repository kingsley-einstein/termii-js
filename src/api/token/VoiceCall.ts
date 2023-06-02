import { replace } from "lodash";
import { BaseTokenAPI, BaseTokenAPIRequestInterface } from "./BaseToken";
import axios from "axios";

export interface VoiceCallRequestInterface
  extends Omit<BaseTokenAPIRequestInterface, "pin_length" | "pin_attempts" | "pin_time_to_live"> {
  phone_number: string;
  code: number;
}

export type VoiceCallResponse = {
  code: string;
  message_id: string;
  pinId: string;
  message: string;
  balance: number;
  user: string;
};

export class VoiceCallAPI extends BaseTokenAPI {
  private apiKey: string;
  private phoneNumber: string;
  private code: number;

  constructor(requestInterface: VoiceCallRequestInterface) {
    super();
    this.baseUrl = replace(this.baseUrl, ":type", "sms").concat("/otp/call");
    this.apiKey = requestInterface.api_key;
    this.phoneNumber = requestInterface.phone_number;
    this.code = requestInterface.code;
  }

  public static createVoiceTokenInstance(requestInterface: VoiceCallRequestInterface) {
    return new VoiceCallAPI(requestInterface);
  }

  public async send() {
    return axios
      .post<VoiceCallResponse>(this.baseUrl, {
        api_key: this.apiKey,
        phone_number: this.phoneNumber,
        code: this.code
      })
      .then((res) => res.data);
  }
}
