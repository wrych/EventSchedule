import { setupUsers } from "./user.js";

export const setupAll = async (): Promise<void> => {
  await setupUsers();
};
