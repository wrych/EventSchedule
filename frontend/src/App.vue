<template>
  <div class="wrapper">
    <header>
      <InfoBar />
    </header>
    <div class="content">
      <!-- <Navigation /> -->
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import InfoBar from "./components/InfoBar.vue";
import Navigation from "./components/Navigation.vue";
</script>

<style scoped>
.wrapper {
  height: 100vh;
  max-width: 1280px;
  padding: 0 20px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto 1fr;
}

.content {
  display: grid;
  height: 100%;
  width: 100%;
}

.navigation {
  display: none;
}

nav {
  width: 100%;
  font-size: small;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-heading);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: block;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  .content {
    grid-template-columns: 1fr;
  }

  .navigation {
    display: block;
  }

  nav {
    text-align: left;
  }
}
</style>
