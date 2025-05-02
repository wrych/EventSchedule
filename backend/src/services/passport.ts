import passport from "passport";
import { Express } from "express";
import User from "../models/User.js";

export const setupPassport = (app: Express) => {
  passport.serializeUser((user, done) => {
    const id = (user as User).id;
    done(null, id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  app.use(passport.initialize());
  app.use(passport.session());
};
