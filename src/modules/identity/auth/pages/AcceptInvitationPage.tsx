import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Card, Button, Input } from "@/components/ui";

import { useAcceptInvitation } from "../hooks/useAcceptInvitation";

const AcceptInvitationPage = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");

  const mutation = useAcceptInvitation();

  const handleSubmit = async () => {
    await mutation.mutateAsync({
      token,
      password,
    });

    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Accept Invitation</h1>

          <p>Create your password to activate your account.</p>

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <Button
            onClick={handleSubmit}
            disabled={password.length < 8 || mutation.isPending}
          >
            {mutation.isPending ? "Creating Account..." : "Create Account"}
          </Button>

          {mutation.error && (
            <p className="text-sm text-red-500">Failed to accept invitation</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AcceptInvitationPage;
