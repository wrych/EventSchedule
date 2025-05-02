import type { AuthUser } from "@/models/AuthUser";
import { useAuthRepository } from "@/repositories/auth";
import * as authApi from "@/apis/auth";
import { ref, watch, type Ref } from "vue";
import type { AuthRoles } from "@/models/AuthRole";

export class AuthService {
  private repository = useAuthRepository();

  getUser = (): Ref<AuthUser | null | undefined> => {
    return this.repository.getUser();
  };

  getRoles = (): Ref<AuthRoles | undefined> => {
    return this.repository.getRoles();
  };

  isAdmin = (): Ref<boolean | undefined> => {
    const isAdmin = ref<boolean | undefined>(undefined);
    const roles = this.repository.getRoles();
    watch(
      roles,
      () => {
        if (roles.value) {
          isAdmin.value = roles.value.roles
            .map((role) => role.title)
            .includes("admin");
        }
      },
      { immediate: true }
    );
    return isAdmin;
  };

  logout = async (): Promise<void> => {
    await authApi.logout();
    await this.repository.updateUser();
  };
}

export const useAuthService = (): AuthService => {
  return new AuthService();
};
