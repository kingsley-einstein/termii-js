import { replace } from "lodash";
import { BaseTokenAPI, BaseTokenAPIRequestInterface } from "./BaseToken";
import axios from "axios";

export interface EmailTokenRequestInterface
  extends Omit<BaseTokenAPIRequestInterface, "pin_length" | "pin_attempts" | "pin_time_to_live"> {
  email_address: string;
  code: string;
  email_configuration_id: string;
}

export type EmailTokenResponse = {
  code: string;
  message_id: string;
  pinId: string;
  message: string;
  balance: number;
  user: string;
};

export class EmailTokenAPI extends BaseTokenAPI {
  private apiKey: string;
  private emailAddress: string;
  private code: string;
  private emailConfigurationId: string;

  constructor(requestInterface: EmailTokenRequestInterface) {
    super();
    this.baseUrl = replace(this.baseUrl, ":type", "email").concat("/otp/send");
    this.apiKey = requestInterface.api_key;
    this.emailAddress = requestInterface.email_address;
    this.code = requestInterface.code;
    this.emailConfigurationId = requestInterface.email_configuration_id;
  }

  public static createEmailTokenInstance(requestInterface: EmailTokenRequestInterface) {
    return new EmailTokenAPI(requestInterface);
  }

  public async send() {
    return axios
      .post<EmailTokenResponse>(this.baseUrl, {
        api_key: this.apiKey,
        email_address: this.emailAddress,
        code: this.code,
        email_configuration_id: this.emailConfigurationId
      })
      .then((res) => res.data);
  }
}
