import { Link } from "react-router-dom";

import LoginForm from "../components/LoginForm";

import AuthLayout from "@/components/layout/AuthLayout";
import AuthCard from "@/components/layout/AuthCard";

const LoginPage = () => {
  return (
    <AuthLayout>
      <AuthCard
        title="Welcome Back"
        subtitle="Sign in to continue managing your inventory."
      >
        <LoginForm />

        <div className="mt-6 flex items-center justify-between text-sm">
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            Forgot Password?
          </Link>

          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            Create Account
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginPage;
