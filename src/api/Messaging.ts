import axios from "axios";

export interface MessageRequestInterface {
  api_key: string;
  to: string | string[];
  from: string;
  sms: string;
  channel: "dnd" | "whatsapp_otp" | "generic";
  media?: {
    url: string;
    caption: string;
  };
}

export type MessageResponse = {
  message_id: string;
  message: string;
  balance: number;
  user: string;
};

export class MessagingAPI {
  private apiKey: string;
  private to: string | string[];
  private from: string;
  private sms: string;
  private channel: "dnd" | "whatsapp_otp" | "generic";
  private media?: { url: string; caption: string };

  constructor(requestInterface: MessageRequestInterface) {
    this.apiKey = requestInterface.api_key;
    this.to = requestInterface.to;
    this.from = requestInterface.from;
    this.sms = requestInterface.sms;
    this.channel = requestInterface.channel;
    this.media = requestInterface.media;
  }

  public static createMessagingInstance(requestInterface: MessageRequestInterface) {
    return new MessagingAPI(requestInterface);
  }

  public async send() {
    let url: string = "";

    if (typeof this.to === "string") url = "https://api.ng.termii.com/api/sms/send";
    else {
      if (this.to.length === 1) {
        this.to = this.to[0];
        url = "https://api.ng.termii.com/api/sms/send";
      } else if (this.to.length > 1) {
        this.media = undefined;
        url = "https://api.ng.termii.com/api/sms/send/bulk";
      } else if (this.to.length === 0) throw new Error("'to' array is empty");
    }

    return axios
      .post<MessageResponse>(url, {
        to: this.to,
        from: this.from,
        sms: this.sms,
        type: "plain",
        api_key: this.apiKey,
        channel: this.channel,
        media: this.media,
        time_in_minutes: this.channel === "whatsapp_otp" ? "10 minutes" : undefined
      })
      .then((res) => res.data);
  }
}
