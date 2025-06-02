import express from "express";
import { ensureAuthenticated } from "./auth.js";
import * as eventService from "../../services/event.js";
import User from "src/models/User.js";

const router = express.Router();

router.get("/", ensureAuthenticated, async (_req, res) => {
  const events = await eventService.getAllEvents();
  res.status(200).json(events);
});

router.post("/", ensureAuthenticated, async (req, res) => {
  const { eventName, startDatetime, endDatetime, description } = req.body;
  const ownerId = (req.user as User).id;
  const event = await eventService.createEvent(
    ownerId,
    eventName,
    new Date(startDatetime),
    new Date(endDatetime),
    description || {}
  );
  res.status(200).json(event);
});

export default router;
