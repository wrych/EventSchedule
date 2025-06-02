import { AuthUser } from "@/models/AuthUser";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<AuthUser | undefined | null>(undefined);

  return { user };
});
