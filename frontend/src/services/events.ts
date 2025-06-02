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
    description?: { html: string };
  }): Promise<void> => {
    await this.repository.createEvent(payload);
  };

  updateDescription = async (
    id: number,
    description: { html: string },
  ): Promise<void> => {
    await this.repository.updateDescription(id, description);
  };
}

export const useEventsService = (): EventsService => {
  return new EventsService();
};
