import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/registerSchema";

import { useRegister } from "../hooks/useRegister";

import AuthLayout from "@/components/layout/AuthLayout";
import AuthCard from "@/components/layout/AuthCard";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { getErrorMessage } from "@/lib/errorHandler";
export default function RegisterForm() {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      organizationName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      timezone: "Asia/Kolkata",
      currencyCode: "INR",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync(data);
      navigate("/verify-email-sent");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Create Your Account"
        subtitle="Start managing inventory professionally with StockPilot"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Organization Name"
            placeholder="ABC Pharmacy"
            error={errors.organizationName?.message}
            {...register("organizationName")}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              error={errors.firstName?.message}
              {...register("firstName")}
            />

            <Input
              label="Last Name"
              placeholder="Doe"
              error={errors.lastName?.message}
              {...register("lastName")}
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            placeholder="owner@company.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />

          {registerMutation.isError && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {getErrorMessage(registerMutation.error)}
            </div>
          )}

          {registerMutation.isSuccess && (
            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
              Registration successful. Please check your email for the
              verification link.
            </div>
          )}

          <Button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full"
          >
            {registerMutation.isPending
              ? "Creating Account..."
              : "Create Account"}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
