import { Link } from "react-router-dom";

import ForgotPasswordForm from "../components/ForgotPasswordForm";

import AuthLayout from "@/components/layout/AuthLayout";
import AuthCard from "@/components/layout/AuthCard";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <AuthCard
        title="Forgot Password?"
        subtitle="Enter your email address and we'll send you a secure password reset link."
      >
        <ForgotPasswordForm />

        <div className="mt-6 text-center text-sm">
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            Back to Sign In
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
