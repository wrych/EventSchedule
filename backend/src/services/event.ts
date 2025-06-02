import Event from "../models/Event.js";
import { RichTextSnapshot, RichTextStep } from "../models/RichText.js";
import { randomBytes } from "crypto";
import ORM from "../data/ORM.js";
import { computeTextDiff } from "../utils/textDiff.js";

interface RichTextDoc {
  html: string;
}

export const getAllEvents = async () => {
  return Event.findAll({
    include: [{ model: RichTextSnapshot, as: "description" }],
    order: [["startDatetime", "ASC"]],
  });
};

export const createEvent = async (
  ownerId: number,
  eventName: string,
  startDatetime: Date,
  endDatetime: Date,
  description: RichTextDoc
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
    await RichTextStep.create(
      {
        snapshotId: snapshot.id!,
        stepIndex: 0,
        stepJson: { start: 0, removed: "", inserted: description.html || "" },
        createdBy: ownerId,
      },
      { transaction: t }
    );
    event.descriptionId = snapshot.id!;
    await event.save({ transaction: t });
    return event;
  });
};

export const getEvent = async (id: number) => {
  return Event.findByPk(id, {
    include: [{ model: RichTextSnapshot, as: "description" }],
  });
};

export const updateDescription = async (
  eventId: number,
  docJson: RichTextDoc,
  userId: number
) => {
  return ORM.transaction(async (t) => {
    const lastSnapshot = await RichTextSnapshot.findOne({
      where: { ownerType: "event", ownerId: eventId },
      order: [["version", "DESC"]],
      transaction: t,
    });
    const nextVersion = (lastSnapshot?.version || 0) + 1;
    const snapshot = await RichTextSnapshot.create(
      {
        ownerType: "event",
        ownerId: eventId,
        version: nextVersion,
        docJson,
        createdBy: userId,
      },
      { transaction: t }
    );
    if (lastSnapshot) {
      const lastDoc = lastSnapshot.docJson as RichTextDoc;
      const diff = computeTextDiff(lastDoc.html || "", docJson.html || "");
      await RichTextStep.create(
        {
          snapshotId: snapshot.id!,
          stepIndex: 0,
          stepJson: diff,
          createdBy: userId,
        },
        { transaction: t }
      );
    }
    const event = await Event.findByPk(eventId, { transaction: t });
    if (!event) {
      throw new Error("Event not found");
    }
    event.descriptionId = snapshot.id!;
    await event.save({ transaction: t });
    return snapshot;
  });
};

export const getDescriptionHistory = async (eventId: number) => {
  return RichTextSnapshot.findAll({
    where: { ownerType: "event", ownerId: eventId },
    include: [{ model: RichTextStep }],
    order: [["version", "DESC"]],
  });
};
