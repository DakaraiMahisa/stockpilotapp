import { categoryRoutes } from "../category/routes/category.routes";
import { brandRoutes } from "../brand/routes/brand.routes";
import { productRoutes } from "../product/routes/product.routes";
import { variantAttributesRoutes } from "../variant-attribute/routes/variant-attribute.routes";
import { pricingRoutes } from "../pricing/routes/pricing.routes";

export const catalogRoutes = [
  ...categoryRoutes,
  ...brandRoutes,
  ...productRoutes,
  ...variantAttributesRoutes,
  ...pricingRoutes,
];
