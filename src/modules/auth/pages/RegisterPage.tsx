import { Link } from "react-router-dom";

import RegisterForm from "../components/RegisterForm";

import AuthLayout from "@/components/layout/AuthLayout";
import AuthCard from "@/components/layout/AuthCard";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <AuthCard
        title="Create Your Organization"
        subtitle="Start managing inventory professionally with StockPilot."
      >
        <RegisterForm />

        <div className="mt-6 text-center text-sm">
          <span className="text-slate-500">Already have an account?</span>{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
