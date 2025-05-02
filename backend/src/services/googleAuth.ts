import passport from "passport";
import {
  GoogleCallbackParameters,
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { Express, Request } from "express";

import * as userService from "../services/user.js";
import User from "../models/User.js";

interface GoogleAuthConfig {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}

const setupGoogleAuth = (app: Express) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "/_auth/google/callback",
        passReqToCallback: true,
      },
      async (
        req: Request,
        accessToken: string,
        refreshToken: string,
        params: GoogleCallbackParameters,
        profile: Profile,
        done: VerifyCallback
      ) => {
        try {
          let user: User | null = await userService.findUserByOAuthId(
            profile.id
          );
          if (!user) {
            user = await userService.updateUser(
              profile.emails![0].value,
              profile.emails![0].verified,
              profile.name!.familyName,
              profile.name!.givenName,
              "google",
              profile.id
            );
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );

  app.get(
    "/_auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/_auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/_auth/",
      failureMessage: "Authentication failed, please try again.",
    }),
    (req, res) => {
      res.redirect("/");
    }
  );
};

export default setupGoogleAuth;
