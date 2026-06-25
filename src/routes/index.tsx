import { createBrowserRouter } from "react-router-dom";

import RegisterPage from "@/modules/identity/auth/pages/RegisterPage";
import LoginPage from "@/modules/identity/auth/pages/LoginPage";
import ForgotPasswordPage from "@/modules/identity/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/modules/identity/auth/pages/ResetPasswordPage";
import VerifyEmailPage from "@/modules/identity/auth/pages/VerifyEmailPage";
import DashboardPage from "@/modules/identity/auth/pages/DashboardPage";
import UsersPage from "@/modules/identity/users/pages/UsersPage";
import UserDetailsPage from "@/modules/identity/users/pages/UserDetailsPage";
import ProtectedRoute from "@/modules/identity/auth/guards/ProtectedRoute";

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
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/users/:id",
        element: <UserDetailsPage />,
      },
    ],
  },
]);
