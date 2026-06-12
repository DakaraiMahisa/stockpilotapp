import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import { useVerifyEmail } from "../hooks/useVerifyEmail";

type ApiErrorResponse = {
  success: boolean;
  message: string;
};

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const verifyEmailMutation = useVerifyEmail();

  useEffect(() => {
    if (!token) return;

    verifyEmailMutation.mutate(token);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!token) {
    return <div>Invalid verification link.</div>;
  }

  if (verifyEmailMutation.isPending) {
    return <div>Verifying your email...</div>;
  }

  if (verifyEmailMutation.isError) {
    const error = verifyEmailMutation.error as AxiosError<ApiErrorResponse>;

    return <div>{error.response?.data?.message ?? "Verification failed."}</div>;
  }

  if (verifyEmailMutation.isSuccess) {
    return (
      <div>
        <h1>Email verified successfully</h1>

        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return <div>Preparing verification...</div>;
};

export default VerifyEmailPage;
