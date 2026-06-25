import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";

import { useVerifyEmail } from "../hooks/useVerifyEmail";

import AuthLayout from "@/components/layout/AuthLayout";
import AuthCard from "@/components/layout/AuthCard";

type ApiErrorResponse = {
  success: boolean;
  message: string;
};

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const verifyEmailMutation = useVerifyEmail();

  useEffect(() => {
    if (!token) return;

    verifyEmailMutation.mutate(token);

    // Verification should happen once per token
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!token) {
    return (
      <AuthLayout>
        <AuthCard
          title="Invalid Verification Link"
          subtitle="This email verification link is invalid or malformed."
        >
          <div className="space-y-5 text-center">
            <div className="text-5xl">⚠️</div>

            <p className="text-sm text-slate-600">
              Please request a new verification email.
            </p>

            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Back to Login
            </Link>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  if (verifyEmailMutation.isPending) {
    return (
      <AuthLayout>
        <AuthCard
          title="Verifying Email"
          subtitle="Please wait while we verify your account."
        >
          <div className="space-y-5 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

            <p className="text-sm text-slate-600">
              Verifying your email address...
            </p>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  if (verifyEmailMutation.isError) {
    const error = verifyEmailMutation.error as AxiosError<ApiErrorResponse>;

    return (
      <AuthLayout>
        <AuthCard
          title="Verification Failed"
          subtitle="We couldn't verify your email."
        >
          <div className="space-y-5 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <span className="text-2xl">❌</span>
            </div>

            <p className="text-sm text-red-600">
              {error.response?.data?.message ?? "Verification failed."}
            </p>

            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Back to Login
            </Link>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  if (verifyEmailMutation.isSuccess) {
    return (
      <AuthLayout>
        <AuthCard title="Email Verified" subtitle="Your account is now active.">
          <div className="space-y-5 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <span className="text-2xl">✅</span>
            </div>

            <p className="text-sm text-slate-600">
              Your email address has been verified successfully. You can now
              sign in to StockPilot.
            </p>

            <Link
              to="/login"
              className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Continue to Login
            </Link>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  return null;
};

export default VerifyEmailPage;
