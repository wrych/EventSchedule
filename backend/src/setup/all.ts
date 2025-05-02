import { setupUsers } from "./user.js";

export const setupAll = async (): Promise<void> => {
  const users = await setupUsers();
};
