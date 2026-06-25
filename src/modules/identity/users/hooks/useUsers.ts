import { useQuery } from "@tanstack/react-query";

import { getUsers, type GetUsersParams } from "../api/getUsers";

export const useUsers = (params: GetUsersParams) => {
  return useQuery({
    queryKey: ["users", params],

    queryFn: () => getUsers(params),
    retry: false,
    refetchOnWindowFocus: false,
  });
};
