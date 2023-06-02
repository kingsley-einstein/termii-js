import axios from "axios";

export interface TemplateRequestInterface {
  api_key: string;
  template_id: string;
  device_id: string;
  phone_number: string;
  data: {
    product_name: string;
    otp: number;
    expiry_time?: string;
  };
}

export type TemplateResponse = {
  code: string;
  message_id: string;
  message: string;
  balance: string;
  user: string;
};

export class TemplateAPI {
  private apiKey: string;
  private templateId: string;
  private deviceId: string;
  private phoneNumber: string;
  private data: { product_name: string; otp: number; expiry_time?: string };

  constructor(requestInterface: TemplateRequestInterface) {
    this.apiKey = requestInterface.api_key;
    this.templateId = requestInterface.template_id;
    this.deviceId = requestInterface.device_id;
    this.phoneNumber = requestInterface.device_id;
    this.data = requestInterface.data;
  }

  public static createTemplateInstance(requestInterface: TemplateRequestInterface) {
    return new TemplateAPI(requestInterface);
  }

  public async send() {
    return axios
      .post<TemplateResponse>("https://api.ng.termii.com/api/send/template", {
        api_key: this.apiKey,
        template_id: this.templateId,
        device_id: this.deviceId,
        phone_number: this.phoneNumber,
        data: this.data
      })
      .then((res) => res.data);
  }
}
