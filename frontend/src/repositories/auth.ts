import { toRef } from "vue";
import type { Ref } from "vue";

import { useAuthStore } from "@/stores/auth";
import * as authApi from "@/apis/auth";
import type { AuthUser } from "@/models/AuthUser";
import type { AuthRoles } from "@/models/AuthRole";

class AuthRepository {
  private store = useAuthStore();

  updateRoles = async (): Promise<void> => {
    this.store.roles = await authApi.getRoles();
  };

  getRoles = (): Ref<AuthRoles | undefined> => {
    if (this.store.roles === undefined) {
      this.updateRoles();
    }
    return toRef(this.store, "roles");
  };

  updateUser = async (): Promise<void> => {
    this.store.user = await authApi.getUser();
  };

  getUser = (): Ref<AuthUser | null | undefined> => {
    if (this.store.user === undefined) {
      this.updateUser();
    }
    return toRef(this.store, "user");
  };
}

let authRepository: AuthRepository | null = null;

export const useAuthRepository = (): AuthRepository => {
  if (!authRepository) {
    authRepository = new AuthRepository();
  }
  return authRepository;
};
