import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { useLogin } from "../hooks/useLogin";
import AuthLayout from "@/components/layout/AuthLayout";
import AuthCard from "@/components/layout/AuthCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
const LoginForm = () => {
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      tenantCode: "",
      email: "",
      password: "",
      deviceInfo: navigator.userAgent,
    },
  });

  useEffect(() => {
    if (loginMutation.isSuccess) {
      navigate("/dashboard");
    }
  }, [loginMutation.isSuccess, navigate]);

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Welcome Back"
        subtitle="Sign in to continue to StockPilot"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Tenant Code"
            placeholder="dakarai-software-solutions"
            error={errors.tenantCode?.message}
            {...register("tenantCode")}
          />

          <Input
            label="Email"
            type="email"
            placeholder="owner@example.com"
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

          {loginMutation.isError && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {loginMutation.error instanceof Error
                ? loginMutation.error.message
                : "Login failed"}
            </div>
          )}

          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full"
          >
            {loginMutation.isPending ? "Signing In..." : "Sign In"}
          </Button>

          <div className="flex justify-between text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>

            <Link to="/register" className="text-blue-600 hover:underline">
              Create Account
            </Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginForm;
