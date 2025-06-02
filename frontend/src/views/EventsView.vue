<template>
  <main>
    <h2 class="highlight">Events</h2>
    <div v-if="user">
      <form @submit.prevent="create">
        <input v-model="name" placeholder="Event name" />
        <input v-model="start" type="datetime-local" />
        <input v-model="end" type="datetime-local" />
        <button>Create</button>
      </form>
      <ul>
        <li v-for="ev in events" :key="ev.id">
          {{ ev.eventName }} ({{ ev.startDatetime }} - {{ ev.endDatetime }})
        </li>
      </ul>
    </div>
    <div v-else>Please log in to manage events.</div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useEventsService } from "@/services/events";
import { useAuthService } from "@/services/auth";

const eventsService = useEventsService();
const authService = useAuthService();
const events = eventsService.getEvents();
const user = authService.getUser();

const name = ref("");
const start = ref("");
const end = ref("");

const create = async () => {
  await eventsService.createEvent({
    eventName: name.value,
    startDatetime: start.value,
    endDatetime: end.value,
  });
  name.value = "";
  start.value = "";
  end.value = "";
};
</script>

<style scoped>
form {
  margin-bottom: 1em;
}
</style>
