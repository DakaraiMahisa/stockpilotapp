import { Link, useLocation } from "react-router-dom";

import AuthLayout from "@/components/layout/AuthLayout";
import AuthCard from "@/components/layout/AuthCard";

type LocationState = {
  email?: string;
};
const VerifyEmailSentPage = () => {
  const location = useLocation();

  const { email } = (location.state as LocationState) ?? {};
  return (
    <AuthLayout>
      <AuthCard
        title="Verify Your Email"
        subtitle="One more step before you can sign in."
      >
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <span className="text-3xl">📧</span>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <p className="text-sm text-slate-600">
                We've sent a verification link to:
              </p>

              <p className="break-all rounded-lg border bg-slate-50 px-4 py-3 font-semibold text-slate-900">
                {email ?? "your email address"}
              </p>

              <p className="text-sm text-slate-600">
                Click the link in the email to activate your StockPilot account.
              </p>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-left">
              <h3 className="font-semibold text-slate-900">
                What happens next?
              </h3>

              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>✓ Open your email inbox.</li>

                <li>✓ Click the verification link.</li>

                <li>✓ Return here and sign in to your account.</li>
              </ul>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-left">
              <h3 className="font-semibold text-slate-900">
                Didn't receive the email?
              </h3>

              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Check your Spam or Junk folder.</li>

                <li>• Make sure you entered the correct email address.</li>

                <li>• Wait a minute before requesting another email.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              to="/login"
              className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Back to Login
            </Link>

            <Link
              to="/register"
              className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Use a Different Email Address
            </Link>

            <button
              type="button"
              disabled
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-medium text-slate-400"
            >
              Resend Verification Email (Coming Soon)
            </button>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default VerifyEmailSentPage;
