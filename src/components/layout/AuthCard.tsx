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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-text-inverse font-bold">
            SP
          </div>

          <div>
            <h1 className="text-2xl font-bold text-brand">StockPilot</h1>

            <p className="text-xs text-text-secondary">
              Inventory Management Platform
            </p>
          </div>
        </div>

        <h2 className="mt-6 text-xl font-semibold">{title}</h2>

        {subtitle && <p className="mt-2 text-text-secondary">{subtitle}</p>}
      </div>

      {children}
    </Card>
  );
};

export default AuthCard;
