import { authRoutes, authenticatedRoutes } from "./auth.routes";

import { profileRoutes, userManagementRoutes } from "./user.routes";

export const identityRoutes = {
  auth: authRoutes,

  authenticated: authenticatedRoutes,

  profile: profileRoutes,

  users: userManagementRoutes,
};
