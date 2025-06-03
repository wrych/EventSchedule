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

  getEvent = async (
    id: number,
  ): Promise<{ event: Event; description: object }> => {
    return this.repository.getEvent(id);
  };

  updateDescription = async (id: number, doc: object): Promise<void> => {
    await this.repository.updateDescription(id, doc);
  };
}

export const useEventsService = (): EventsService => {
  return new EventsService();
};
