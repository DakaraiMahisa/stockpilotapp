import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/registerSchema";
import { useRegister } from "../hooks/useRegister";

export default function RegisterForm() {
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

      console.log("Registration successful");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register("organizationName")}
          placeholder="Organization Name"
        />
        {errors.organizationName && <p>{errors.organizationName.message}</p>}
      </div>

      <div>
        <input {...register("firstName")} placeholder="First Name" />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>

      <div>
        <input {...register("lastName")} placeholder="Last Name" />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>

      <div>
        <input {...register("email")} placeholder="Email" type="email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={registerMutation.isPending}>
        {registerMutation.isPending ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}
