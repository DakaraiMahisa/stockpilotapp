export const formatRole = (role?: string): string => {
  if (!role) return "";

  return role
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c: string) => c.toUpperCase());
};
