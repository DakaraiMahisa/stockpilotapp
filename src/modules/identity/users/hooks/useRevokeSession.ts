import { useMutation, useQueryClient } from "@tanstack/react-query";

import { revokeSession } from "../services/userService";

export const useRevokeSession = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => revokeSession(userId, sessionId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-sessions", userId],
      });
    },
  });
};
