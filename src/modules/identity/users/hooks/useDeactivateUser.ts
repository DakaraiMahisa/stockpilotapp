import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deactivateUser } from "../services/userService";

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deactivateUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
