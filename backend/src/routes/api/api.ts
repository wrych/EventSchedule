import express from "express";

import authRouter from "./auth.js";
import eventsRouter from "./events.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the LoM Survery API!" });
});

router.use("/auth", authRouter);
router.use("/events", eventsRouter);

export default router;
