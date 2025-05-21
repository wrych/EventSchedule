import { defineStore } from "pinia";
import { ref } from "vue";
import type { Event } from "@/models/Event";

export const useEventsStore = defineStore("events", () => {
  const events = ref<Event[] | undefined>(undefined);
  return { events };
});
