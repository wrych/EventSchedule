import { toRef } from "vue";
import type { Ref } from "vue";
import { useEventsStore } from "@/stores/events";
import * as eventsApi from "@/apis/events";
import type { Event } from "@/models/Event";

class EventsRepository {
  private store = useEventsStore();

  updateEvents = async (): Promise<void> => {
    this.store.events = await eventsApi.getEvents();
  };

  getEvents = (): Ref<Event[] | undefined> => {
    if (this.store.events === undefined) {
      this.updateEvents();
    }
    return toRef(this.store, "events");
  };

  createEvent = async (payload: {
    eventName: string;
    startDatetime: string;
    endDatetime: string;
    description?: object;
  }): Promise<void> => {
    const event = await eventsApi.createEvent(payload);
    if (this.store.events) {
      this.store.events.push(event);
    } else {
      this.store.events = [event];
    }
  };

  getEvent = async (
    id: number,
  ): Promise<{ event: Event; description: object }> => {
    return eventsApi.getEvent(id);
  };

  updateDescription = async (id: number, doc: object): Promise<void> => {
    await eventsApi.updateDescription(id, doc);
    if (this.store.events) {
      const idx = this.store.events.findIndex((e) => e.id === id);
      if (idx >= 0) {
        const updated = await eventsApi.getEvent(id);
        this.store.events[idx] = updated.event;
      }
    }
  };
}

let eventsRepository: EventsRepository | null = null;

export const useEventsRepository = (): EventsRepository => {
  if (!eventsRepository) {
    eventsRepository = new EventsRepository();
  }
  return eventsRepository;
};
