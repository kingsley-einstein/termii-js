import { replace } from "lodash";
import { BaseTokenAPI, BaseTokenAPIRequestInterface } from "./BaseToken";
import axios from "axios";

export interface VoiceTokenRequestInterface extends BaseTokenAPIRequestInterface {
  phone_number: string;
}

export type VoiceTokenResponse = {
  code: string;
  message_id: string;
  pinId: string;
  message: string;
  balance: number;
  user: string;
};

export class VoiceTokenAPI extends BaseTokenAPI {
  private apiKey: string;
  private pinLength: number;
  private pinAttempts: number;
  private pinTimeToLive: number;
  private phoneNumber: string;

  constructor(requestInterface: VoiceTokenRequestInterface) {
    super();
    this.baseUrl = replace(this.baseUrl, ":type", "sms").concat("/otp/send/voice");
    this.apiKey = requestInterface.api_key;
    this.pinLength = requestInterface.pin_length;
    this.pinAttempts = requestInterface.pin_attempts;
    this.pinTimeToLive = requestInterface.pin_time_to_live;
    this.phoneNumber = requestInterface.phone_number;
  }

  public static createVoiceTokenInstance(requestInterface: VoiceTokenRequestInterface) {
    return new VoiceTokenAPI(requestInterface);
  }

  public async send() {
    return axios
      .post<VoiceTokenResponse>(this.baseUrl, {
        api_key: this.apiKey,
        phone_number: this.phoneNumber,
        pin_length: this.pinLength,
        pin_attempts: this.pinAttempts,
        pin_time_to_live: this.pinTimeToLive
      })
      .then((res) => res.data);
  }
}
