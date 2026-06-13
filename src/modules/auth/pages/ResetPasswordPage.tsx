import { useSearchParams } from "react-router-dom";

import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  if (!token) {
    return <div>Invalid password reset link.</div>;
  }

  return (
    <div>
      <h1>Reset Password</h1>

      <ResetPasswordForm token={token} />
    </div>
  );
};

export default ResetPasswordPage;
