import type { Event } from "@/models/Event";
import { getJson, postJson } from "./common";

export const getEvents = async (): Promise<Event[]> => {
  return (await getJson<Event[]>("/api/events")) as Event[];
};

export const getEvent = async (id: number): Promise<Event> => {
  return (await getJson<Event>(`/api/events/${id}`)) as Event;
};

export const updateDescription = async (
  id: number,
  description: { html: string },
): Promise<void> => {
  await postJson<void>(`/api/events/${id}/description`, { description });
};

export const getHistory = async (id: number): Promise<object[]> => {
  return (await getJson<object[]>(`/api/events/${id}/history`)) as object[];
};

export const createEvent = async (payload: {
  eventName: string;
  startDatetime: string;
  endDatetime: string;
  description?: { html: string };
}): Promise<Event> => {
  return (await postJson<Event>("/api/events", payload)) as Event;
};
