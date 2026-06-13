import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../schemas/resetPasswordSchema";

import { useResetPassword } from "../hooks/useResetPassword";

interface Props {
  token: string;
}

const ResetPasswordForm = ({ token }: Props) => {
  const mutation = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    mutation.mutate({
      token,
      newPassword: data.newPassword,
    });
  };

  if (mutation.isSuccess) {
    return <div>Password reset successfully.</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>New Password</label>

        <input type="password" {...register("newPassword")} />

        {errors.newPassword && <p>{errors.newPassword.message}</p>}
      </div>

      <div>
        <label>Confirm Password</label>

        <input type="password" {...register("confirmPassword")} />

        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      {mutation.isError && (
        <p>
          {mutation.error instanceof Error
            ? mutation.error.message
            : "Password reset failed"}
        </p>
      )}

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
