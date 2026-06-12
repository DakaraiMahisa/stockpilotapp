import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const loginMutation = useLogin();

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

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Tenant Code</label>

        <input type="text" {...register("tenantCode")} />

        {errors.tenantCode && <p>{errors.tenantCode.message}</p>}
      </div>

      <div>
        <label>Email</label>

        <input type="email" {...register("email")} />

        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>

        <input type="password" {...register("password")} />

        {errors.password && <p>{errors.password.message}</p>}
      </div>

      {loginMutation.isError && (
        <p>
          {loginMutation.error instanceof Error
            ? loginMutation.error.message
            : "Login failed"}
        </p>
      )}

      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;
