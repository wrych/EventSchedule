import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EventsView from "../views/EventsView.vue";
import EventOverview from "../views/EventOverview.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/events",
      name: "events",
      component: EventsView,
    },
    {
      path: "/events/:id",
      name: "event-overview",
      component: EventOverview,
    },
  ],
});

export default router;
