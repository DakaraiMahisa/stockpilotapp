import Card from "../ui/Card";

type AuthCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const AuthCard = ({ title, subtitle, children }: AuthCardProps) => {
  return (
    <Card className="w-full max-w-md">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand)] text-white font-bold">
            SP
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[var(--brand)]">
              StockPilot
            </h1>

            <p className="text-xs text-gray-500">
              Inventory Management Platform
            </p>
          </div>
        </div>

        <h2 className="mt-6 text-xl font-semibold">{title}</h2>

        {subtitle && <p className="mt-2 text-gray-500">{subtitle}</p>}
      </div>

      {children}
    </Card>
  );
};

export default AuthCard;
