export interface BaseTokenAPIRequestInterface {
  api_key: string;
  pin_length: number;
  pin_attempts: number;
  pin_time_to_live: number;
}

export abstract class BaseTokenAPI {
  public baseUrl: string = "https://api.ng.termii.com/api/:type";
}
