<template>
  <div v-if="event">
    <h2>{{ event.eventName }}</h2>
    <p>{{ event.startDatetime }} - {{ event.endDatetime }}</p>
    <div
      class="editor"
      contenteditable="true"
      :innerHTML="html"
      @input="onInput"
    ></div>
    <button @click="save">Save</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { Event as EventModel } from "@/models/Event";
import { useEventsService } from "@/services/events";

const route = useRoute();
const eventsService = useEventsService();
const event = ref<EventModel | null>(null);
const html = ref("");

onMounted(async () => {
  const id = parseInt(route.params.id as string);
  const data = await eventsService.getEvent(id);
  event.value = data.event;
  html.value = (data.description as any).html || "";
});

const onInput = (e: Event) => {
  html.value = (e.target as HTMLElement).innerHTML;
};

const save = async () => {
  if (event.value) {
    await eventsService.updateDescription(event.value.id, { html: html.value });
  }
};
</script>

<style scoped>
.editor {
  border: 1px solid #ccc;
  min-height: 100px;
  padding: 4px;
  margin-bottom: 1em;
}
</style>
