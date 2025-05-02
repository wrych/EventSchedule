import User from "../models/User.js";
import { create } from "../services/user.js";

const emails = [
  "andy.moesch@dectris.com",
  "valeria.radicci@dectris.com",
  "ivo.pejakovic@dectris.com",
  "matthias.schneebeli@dectris.com",
];

export const setupUsers = async () => {
  const users: Record<string, User> = {};
  emails.forEach(async (email) => {
    const user = await create(email);
    users[email] = user;
  });
  return users;
};
