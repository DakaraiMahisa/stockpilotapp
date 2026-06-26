import { useQuery } from "@tanstack/react-query";

import { getUserSessions } from "../services/userService";

export const useUserSessions = (userId: string) => {
  return useQuery({
    queryKey: ["user-sessions", userId],
    queryFn: () => getUserSessions(userId),
    enabled: !!userId,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
