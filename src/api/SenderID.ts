import axios from "axios";

export interface SenderIDRequestInterface {
  api_key: string;
  sender_id: string;
  usecase: string;
  company: string;
}

export class SenderIDAPI {
  private apiKey: string;
  private senderId: string;
  private useCase: string;
  private company: string;

  constructor(requestInterface: SenderIDRequestInterface) {
    this.apiKey = requestInterface.api_key;
    this.senderId = requestInterface.sender_id;
    this.useCase = requestInterface.usecase;
    this.company = requestInterface.usecase;
  }

  public static createSenderIDInstance(requestInterface: SenderIDRequestInterface) {
    return new SenderIDAPI(requestInterface);
  }

  public async fetchSenderID() {
    return axios
      .get<{
        current_page: number;
        data: Array<
          Omit<SenderIDRequestInterface, "api_key"> & { country: string; created_at: string; status: string }
        >;
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
      }>(`https://api.ng.termii.com/api/sender-id?api_key=${this.apiKey}`)
      .then((res) => res.data);
  }

  public async requestSenderID() {
    return axios
      .post<{ code: string; message: string }>("https://api.ng.termii.com/api/sender-id/request", {
        api_key: this.apiKey,
        sender_id: this.senderId,
        usecase: this.useCase,
        company: this.company
      })
      .then((res) => res.data);
  }
}
