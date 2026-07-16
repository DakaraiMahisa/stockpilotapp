import TaxListPage from "../pages/TaxListPage";
import CreateTaxClassPage from "../pages/CreateTaxClassPage";
import EditTaxClassPage from "../pages/EditTaxCLassPage";
import AddTaxRatePage from "../pages/AddTaxRatePage";
import ResolveTaxPage from "../pages/ResolveTaxPage";

export const taxRoutes = [
  {
    path: "/organization/taxes",
    element: <TaxListPage />,
  },
  {
    path: "/organization/tax/new",
    element: <CreateTaxClassPage />,
  },
  {
    path: "/organization/tax/:id/edit",
    element: <EditTaxClassPage />,
  },
  {
    path: "/organization/tax/:id/rates/new",
    element: <AddTaxRatePage />,
  },
  {
    path: "/organization/taxes/resolve",
    element: <ResolveTaxPage />,
  },
];
