<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <div v-if="user">
      <RouterLink to="/events">Events</RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthService } from "@/services/auth";

const authService = useAuthService();
const user = authService.getUser();
</script>
