type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div
      className="
        min-h-screen
        bg-slate-50
        flex
        items-center
        justify-center
        p-4
      "
    >
      {children}
    </div>
  );
};

export default AuthLayout;
