<template>
  <div class="info-bar-container">
    <div class="logo"></div>
    <div class="user">
      <div v-if="user">
        <span>{{ user.email }}</span>
        <br />
        <form @submit.prevent="authService.logout">
          <button>Log Out</button>
        </form>
      </div>
      <div v-else>
        <form action="/_auth/">
          <button>Log In</button>
        </form>
      </div>
    </div>
    <div class="menu"></div>
  </div>
</template>

<script setup lang="ts">
import { useAuthService } from "@/services/auth";

const authService = useAuthService();
const user = authService.getUser();
</script>

<style scoped>
.info-bar-container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  font-size: small;
}

.user {
  padding: 5px;
}

button {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-soft);
  color: var(--color-title);
  cursor: pointer;
}

button:hover {
  background-color: var(--color-background-mute);
  color: var(--color-heading);
}
</style>
