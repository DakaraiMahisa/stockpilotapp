import { organizationRoutes } from "./organization.routes";
import { branchRoutes } from "./branch.routes";
import { businessConfigRoutes } from "./business-config.routes";
import { subscriptionRoutes } from "./subscription.routes";
import { org_settingsRoutes } from "./org-settings.routes";

import { taxRoutes } from "./tax.routes";

export const orgRoutes = [
  ...organizationRoutes,
  ...branchRoutes,
  ...businessConfigRoutes,
  ...taxRoutes,
  ...subscriptionRoutes,
  ...org_settingsRoutes,
];
