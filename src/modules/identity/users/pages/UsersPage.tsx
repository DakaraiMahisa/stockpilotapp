import UserTable from "../components/UserTable";
import UserHeader from "../components/UserHeader";
import UserFilters from "../components/UserFilters";
import { Card } from "@/components/ui";
import { useUsers } from "../hooks/useUsers";

const UsersPage = () => {
  const { data, isLoading, error } = useUsers({
    page: 0,
    size: 20,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users</div>;
  }

  return (
    <div className="space-y-6">
      <UserHeader totalUsers={data?.totalElements ?? 0} />

      <Card>
        <UserFilters />

        <div className="mt-6">
          <UserTable users={data?.content ?? []} />
        </div>
      </Card>
    </div>
  );
};

export default UsersPage;
