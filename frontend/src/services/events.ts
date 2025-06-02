import type { Ref } from "vue";
import { useEventsRepository } from "@/repositories/events";
import type { Event } from "@/models/Event";

export class EventsService {
  private repository = useEventsRepository();

  getEvents = (): Ref<Event[] | undefined> => {
    return this.repository.getEvents();
  };

  createEvent = async (payload: {
    eventName: string;
    startDatetime: string;
    endDatetime: string;
    description?: object;
  }): Promise<void> => {
    await this.repository.createEvent(payload);
  };
}

export const useEventsService = (): EventsService => {
  return new EventsService();
};
