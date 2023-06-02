import { ary } from "lodash";
import { API } from "./api";

export const createTermiiAPIInstance: (apiKey: string) => API = ary((apiKey: string) => new API(apiKey), 1);

export * from "./api/Messaging";
export * from "./api/Numbers";
export * from "./api/Template";
export * from "./api/SenderID";
export * from "./api/token";
