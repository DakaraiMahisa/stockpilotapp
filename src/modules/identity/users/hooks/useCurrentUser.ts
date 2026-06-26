import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../services/userService";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });
};
