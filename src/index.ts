import { API } from "./api";

const createTermiiInstance = (apiKey: string) => new API(apiKey);

export default createTermiiInstance;
export * from "./api/Messaging";