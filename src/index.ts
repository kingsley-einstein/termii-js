import { API } from "./api";

export const createTermiiInstance = (apiKey: string) => new API(apiKey);

export * from "./api/Messaging";
export * from "./api/Numbers";