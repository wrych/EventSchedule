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
  const event = await eventService.getEvent(parseInt(req.params.id, 10));
  if (event) {
    res.status(200).json(event);
  } else {
    res.status(404).json({ error: "Event not found" });
  }
});

router.put("/:id/description", ensureAuthenticated, async (req, res) => {
  const docJson = req.body.description || {};
  const ownerId = (req.user as User).id;
  try {
    const snapshot = await eventService.updateDescription(
      parseInt(req.params.id, 10),
      docJson,
      ownerId
    );
    res.status(200).json(snapshot);
  } catch {
    res.status(400).json({ error: "Unable to update description" });
  }
});

router.get("/:id/history", ensureAuthenticated, async (req, res) => {
  const history = await eventService.getDescriptionHistory(
    parseInt(req.params.id, 10)
  );
  res.status(200).json(history);
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
