import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Authorisation required." }); // Unauthorized
};

router.get("/user", (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user!);
  } else {
    res.status(200).json(null);
  }
});

router.post("/logout", function (req: Request, res: Response) {
  req.logout((err: Error) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Unexpected error." });
    }
    return res.status(200).json({ message: "log-out successful" });
  });
});

export default router;
