import { Link, useSearchParams } from "react-router-dom";

import ResetPasswordForm from "../components/ResetPasswordForm";

import AuthLayout from "@/components/layout/AuthLayout";
import AuthCard from "@/components/layout/AuthCard";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  if (!token) {
    return (
      <AuthLayout>
        <AuthCard
          title="Invalid Reset Link"
          subtitle="This password reset link is invalid or has expired."
        >
          <div className="space-y-5 text-center">
            <div className="text-5xl">⚠️</div>

            <p className="text-sm text-slate-600">
              Please request a new password reset email.
            </p>

            <Link
              to="/forgot-password"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Request New Link
            </Link>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Reset Password"
        subtitle="Choose a strong password for your account."
      >
        <ResetPasswordForm token={token} />

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

export default ResetPasswordPage;
