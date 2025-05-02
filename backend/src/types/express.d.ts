import "express";
import session from "express-session";

import { Assessment } from "../models/Assessment";
import { Dimension } from "../models/Dimension";
import AssessmentSession from "../models/AssessmentSession";

declare module "express" {
  interface Response {
    locals: Record<string, any>;
  }
}

declare module "express-session" {
  interface SessionData {
    messages: string[];
  }
}

declare module "express" {
  interface Request {
    session: session.Session & Partial<session.SessionData>;
  }
}

declare module "express-serve-static-core" {
  interface Request {
    assessment?: Assessment;
    permissions?: Assessment;
    assessmentSession?: AssessmentSession;
    dimension?: Dimension;
  }
}
