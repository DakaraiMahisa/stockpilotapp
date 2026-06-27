import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../schemas/forgotPasswordSchema";

import { useForgotPassword } from "../hooks/useForgotPassword";

import AuthLayout from "@/components/layout/AuthLayout";
import AuthCard from "@/components/layout/AuthCard";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const ForgotPasswordForm = () => {
  const mutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    mutation.mutate(data);
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Forgot Password?"
        subtitle="Enter your email address and we'll send you a reset link."
      >
        {mutation.isSuccess ? (
          <div className="space-y-5 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <span className="text-2xl">📧</span>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Check your inbox
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Password reset instructions have been sent to your email
                address.
              </p>
            </div>

            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="owner@company.com"
              error={errors.email?.message}
              {...register("email")}
            />

            {mutation.isError && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {mutation.error.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full"
            >
              {mutation.isPending ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="text-center text-sm">
              <Link to="/login" className="text-blue-600 hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPasswordForm;
