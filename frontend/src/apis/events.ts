import type { Event } from "@/models/Event";
import axios from "axios";
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

export const getEvent = async (
  id: number,
): Promise<{ event: Event; description: object }> => {
  return (await getJson(`/api/events/${id}`)) as {
    event: Event;
    description: object;
  };
};

export const updateDescription = async (
  id: number,
  docJson: object,
): Promise<void> => {
  await axios.put(`/api/events/${id}/description`, { docJson });
};
