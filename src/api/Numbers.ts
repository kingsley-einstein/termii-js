import axios from "axios";

export interface NumberRequestInterface {
  api_key: string;
  to: string;
  sms: string;
}

type NumbersResponse = {
  code: string;
  message_id: string;
  message: string;
  balance: number;
  user: string;
};

export class NumbersAPI {
  private apiKey: string;
  private to: string;
  private sms: string;

  constructor(requestInterface: NumberRequestInterface) {
    this.apiKey = requestInterface.api_key;
    this.to = requestInterface.to;
    this.sms = requestInterface.sms;
  }

  public static createNumberInstance(requestInterface: NumberRequestInterface) {
    return new NumbersAPI(requestInterface);
  }

  public async send() {
    return axios
      .post<NumbersResponse>("https://api.ng.termii.com/api/sms/number/send", {
        api_key: this.apiKey,
        to: this.to,
        sms: this.sms
      })
      .then((res) => res.data);
  }
}
