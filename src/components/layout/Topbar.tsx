import UserMenu from "./UserMenu";
import { ThemeToggle } from "@/components/ui";

const Topbar = () => {
  return (
    <header
      className="
        sticky
        top-0
        z-sticky
        flex
        h-16
        items-center
        justify-between
        border-b
        border-border
        bg-background/95
        px-8
        backdrop-blur
      "
    >
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden text-right md:block">
          <p className="text-sm font-medium text-foreground">Welcome back</p>

          <p className="text-xs text-muted-foreground">StockPilot User</p>
        </div>
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
};

export default Topbar;
