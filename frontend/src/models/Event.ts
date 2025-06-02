export interface Event {
  id: number;
  hash: string;
  ownerId: number;
  eventName: string;
  descriptionId?: number | null;
  startDatetime: string;
  endDatetime: string;
  description?: { html: string };
  version?: number;
}
