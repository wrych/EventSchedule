import Event from "../models/Event.js";
import { RichTextSnapshot } from "../models/RichText.js";
import { randomBytes } from "crypto";
import ORM from "../data/ORM.js";

export const getAllEvents = async () => {
  return Event.findAll({ order: [["startDatetime", "ASC"]] });
};

export const createEvent = async (
  ownerId: number,
  eventName: string,
  startDatetime: Date,
  endDatetime: Date,
  description: object
) => {
  return ORM.transaction(async (t) => {
    const event = await Event.create(
      {
        ownerId,
        eventName,
        descriptionId: 0,
        startDatetime,
        endDatetime,
        hash: randomBytes(16).toString("hex"),
      },
      { transaction: t }
    );
    const snapshot = await RichTextSnapshot.create(
      {
        ownerType: "event",
        ownerId: event.id!,
        version: 1,
        docJson: description,
        createdBy: ownerId,
      },
      { transaction: t }
    );
    event.descriptionId = snapshot.id!;
    await event.save({ transaction: t });
    return event;
  });
};
