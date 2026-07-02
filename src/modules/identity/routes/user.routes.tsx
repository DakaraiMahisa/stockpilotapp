import ProfilePage from "../users/pages/ProfilePage";
import UsersPage from "../users/pages/UsersPage";
import UserDetailsPage from "../users/pages/UserDetailsPage";

export const profileRoutes = [
  {
    path: "/profile",
    element: <ProfilePage />,
  },
];

export const userManagementRoutes = [
  {
    path: "/users",
    element: <UsersPage />,
  },
  {
    path: "/users/:id",
    element: <UserDetailsPage />,
  },
];
