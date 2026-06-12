import { createBrowserRouter } from "react-router-dom";

import RegisterPage from "@/modules/auth/pages/RegisterPage";
import LoginPage from "@/modules/auth/pages/LoginPage";
import VerifyEmailPage from "@/modules/auth/pages/VerifyEmailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmailPage />,
  },
]);
