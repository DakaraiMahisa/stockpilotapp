import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activateUser } from "../services/userService";

export const useActivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activateUser,

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
