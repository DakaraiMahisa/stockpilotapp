import { useMutation, useQueryClient } from "@tanstack/react-query";

import { changeUserRole } from "../services/userService";

export const useChangeUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, roleId }: { userId: string; roleId: string }) =>
      changeUserRole(userId, roleId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["user", variables.userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
