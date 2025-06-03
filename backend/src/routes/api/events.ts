import express from "express";
import { ensureAuthenticated } from "./auth.js";
import * as eventService from "../../services/event.js";
import User from "src/models/User.js";

const router = express.Router();

router.get("/", ensureAuthenticated, async (_req, res) => {
  const events = await eventService.getAllEvents();
  res.status(200).json(events);
});

router.get("/:id", ensureAuthenticated, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const result = await eventService.getEvent(id);
  if (!result) {
    res.status(404).json({ message: "Event not found" });
    return;
  }
  res.status(200).json(result);
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

router.put("/:id/description", ensureAuthenticated, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const docJson = req.body.docJson;
  const userId = (req.user as User).id;
  const snapshot = await eventService.updateDescription(id, docJson, userId);
  if (!snapshot) {
    res.status(404).json({ message: "Event not found" });
    return;
  }
  res.status(200).json(snapshot);
});

export default router;
