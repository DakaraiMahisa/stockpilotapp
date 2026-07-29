import LoginPage from "../auth/pages/LoginPage";
import RegisterPage from "../auth/pages/RegisterPage";
import ForgotPasswordPage from "../auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../auth/pages/ResetPasswordPage";
import VerifyEmailPage from "../auth/pages/VerifyEmailPage";
import VerifyEmailSentPage from "../auth/pages/VerifyEmailSentPage";
import DashboardPage from "../../dashboard/pages/DashboardPage";
import AcceptInvitationPage from "../auth/pages/AcceptInvitationPage";

export const authRoutes = [
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
    path: "/verify-email-sent",
    element: <VerifyEmailSentPage />,
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
    path: "/accept-invitation",
    element: <AcceptInvitationPage />,
  },
];

export const authenticatedRoutes = [
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
];
