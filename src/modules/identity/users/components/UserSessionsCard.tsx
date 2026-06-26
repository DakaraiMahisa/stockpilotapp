import { Button, Card } from "@/components/ui";
import { formatDateTime } from "@/utils/date";

import { useUserSessions } from "../hooks/useUserSessions";
import { useRevokeSession } from "../hooks/useRevokeSession";

interface UserSessionsCardProps {
  userId: string;
}

const UserSessionsCard = ({ userId }: UserSessionsCardProps) => {
  const { data: sessions, isLoading, error } = useUserSessions(userId);

  const { mutate: revokeSession, isPending } = useRevokeSession(userId);

  if (isLoading) {
    return (
      <Card>
        <div>Loading sessions...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div>Failed to load sessions.</div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="space-y-4">
        <h2
          className="text-xl font-semibold"
          style={{
            color: "var(--text-primary)",
          }}
        >
          Active Sessions
        </h2>

        {!sessions || sessions.length === 0 ? (
          <p
            className="text-sm"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            No active sessions.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr
                  className="border-b"
                  style={{
                    borderColor: "var(--border)",
                  }}
                >
                  <th className="py-3 text-left text-sm font-medium">
                    IP Address
                  </th>

                  <th className="py-3 text-left text-sm font-medium">
                    User Agent
                  </th>

                  <th className="py-3 text-left text-sm font-medium">
                    Last Used
                  </th>

                  <th className="py-3 text-left text-sm font-medium">
                    Expires
                  </th>

                  <th className="py-3 text-right text-sm font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {sessions.map((session) => (
                  <tr
                    key={session.id}
                    className="border-b"
                    style={{
                      borderColor: "var(--border)",
                    }}
                  >
                    <td className="py-3">{session.ipAddress}</td>

                    <td className="max-w-sm truncate py-3">
                      {session.userAgent}
                    </td>

                    <td className="py-3">
                      {formatDateTime(session.lastUsedAt)}
                    </td>

                    <td className="py-3">
                      {formatDateTime(session.expiresAt)}
                    </td>

                    <td className="py-3 text-right">
                      <Button
                        disabled={isPending}
                        onClick={() => revokeSession(session.id)}
                      >
                        Revoke
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Card>
  );
};

export default UserSessionsCard;
