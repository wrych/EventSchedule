import type { Event } from "@/models/Event";
import { getJson, postJson } from "./common";

export const getEvents = async (): Promise<Event[]> => {
  return (await getJson<Event[]>("/api/events")) as Event[];
};

export const createEvent = async (payload: {
  eventName: string;
  startDatetime: string;
  endDatetime: string;
  description?: object;
}): Promise<Event> => {
  return (await postJson<Event>("/api/events", payload)) as Event;
};
