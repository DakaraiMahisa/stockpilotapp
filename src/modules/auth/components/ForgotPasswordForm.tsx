import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../schemas/forgotPasswordSchema";

import { useForgotPassword } from "../hooks/useForgotPassword";

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

  if (mutation.isSuccess) {
    return <div>Password reset instructions have been sent to your email.</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>

        <input type="email" {...register("email")} />

        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
