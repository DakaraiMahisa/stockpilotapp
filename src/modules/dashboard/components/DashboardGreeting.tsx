import { useCurrentUser } from "@/modules/identity/users/hooks/useCurrentUser";

const DashboardGreeting = () => {
  const { data: user } = useCurrentUser();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
        ? "Good Afternoon"
        : hour < 21
          ? "Good Evening"
          : "Welcome Back";

  return (
    <div className="space-y-1">
      <h1 className="text-3xl font-bold text-foreground">
        {greeting}, {user?.firstName} 👋
      </h1>

      <p className="text-muted-foreground">
        Here's what's happening across your business today.
      </p>
    </div>
  );
};

export default DashboardGreeting;
