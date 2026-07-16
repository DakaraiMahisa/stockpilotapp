import { organizationRoutes } from "./organization.routes";
import { branchRoutes } from "./branch.routes";
import { businessConfigRoutes } from "./business-config.routes";

import { taxRoutes } from "./tax.routes";

export const orgRoutes = [
  ...organizationRoutes,
  ...branchRoutes,
  ...businessConfigRoutes,
  ...taxRoutes,
];
