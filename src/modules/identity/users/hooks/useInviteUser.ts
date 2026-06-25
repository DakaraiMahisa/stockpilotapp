import { useMutation, useQueryClient } from "@tanstack/react-query";

import { inviteUser } from "../services/userService";

export const useInviteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inviteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
