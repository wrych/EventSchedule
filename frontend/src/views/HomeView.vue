<template>
  <main>
    <div class="main">
      <h2 class="highlight">DECTRIS Event Schedule</h2>
      <div v-if="user">
        Welcom {{ user.givenName }}! You are logged in as {{ user.email }}.
      </div>
      <div v-else>
        <p>Please <a href="/_auth/">log in</a> to access the page.</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAuthService } from "@/services/auth";

const authService = useAuthService();
const user = authService.getUser();
</script>

<style scoped>
.main {
  width: 100%;
  max-width: 581px;
  max-height: 100vh;
  position: relative;
}
</style>
