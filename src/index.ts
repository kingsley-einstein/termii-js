import { API } from "./api";

export const createTermiiAPIInstance = (apiKey: string) => new API(apiKey);

export * from "./api/Messaging";
export * from "./api/Numbers";
export * from "./api/Template";
export * from "./api/SenderID";
