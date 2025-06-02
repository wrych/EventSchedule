<template>
  <main>
    <h2 class="highlight">Events</h2>
    <div v-if="user">
      <form @submit.prevent="create">
        <input v-model="name" placeholder="Event name" />
        <input v-model="start" type="datetime-local" />
        <input v-model="end" type="datetime-local" />
        <div
          ref="createDescRef"
          contenteditable
          class="desc-editor"
          @input="onCreateDescInput"
        ></div>
        <button>Create</button>
      </form>
      <ul>
        <li v-for="ev in events" :key="ev.id">
          <div>
            {{ ev.eventName }} ({{ ev.startDatetime }} - {{ ev.endDatetime }})
          </div>
          <div v-html="ev.description?.html"></div>
          <div v-if="editing === ev.id">
            <div
              ref="editDescRef"
              contenteditable
              class="desc-editor"
              @input="onEditDescInput"
            ></div>
            <button @click="save(ev.id)">Save</button>
          </div>
          <button v-else @click="startEdit(ev)">Edit Description</button>
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
import type { Event } from "@/models/Event";

const eventsService = useEventsService();
const authService = useAuthService();
const events = eventsService.getEvents();
const user = authService.getUser();

const name = ref("");
const start = ref("");
const end = ref("");
const createDesc = ref("");
const createDescRef = ref<HTMLElement | null>(null);
const editing = ref<number | null>(null);
const editDesc = ref("");
const editDescRef = ref<HTMLElement | null>(null);

const onCreateDescInput = () => {
  createDesc.value = createDescRef.value?.innerHTML || "";
};

const onEditDescInput = () => {
  editDesc.value = editDescRef.value?.innerHTML || "";
};

const create = async () => {
  await eventsService.createEvent({
    eventName: name.value,
    startDatetime: start.value,
    endDatetime: end.value,
    description: { html: createDesc.value },
  });
  name.value = "";
  start.value = "";
  end.value = "";
  createDesc.value = "";
  if (createDescRef.value) createDescRef.value.innerHTML = "";
};

const startEdit = (ev: Event) => {
  editing.value = ev.id;
  editDesc.value = (ev as any).description?.html || "";
  if (editDescRef.value) {
    editDescRef.value.innerHTML = editDesc.value;
  }
};

const save = async (id: number) => {
  await eventsService.updateDescription(id, { html: editDesc.value });
  editing.value = null;
};
</script>

<style scoped>
form {
  margin-bottom: 1em;
}
.desc-editor {
  border: 1px solid #ccc;
  padding: 0.5em;
  min-height: 3em;
  margin-bottom: 0.5em;
}
</style>
