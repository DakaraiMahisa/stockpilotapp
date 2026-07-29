import CurrentTime from "./CurrentTime";
import UserInfo from "./UserInfo";
import UserMenu from "./UserMenu";
import { ThemeToggle } from "@/components/ui";
import { usePageMetadata } from "@/components/hooks/usePageMetadata";
const Topbar = () => {
  const { title, subtitle } = usePageMetadata();
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
      {/* Left Section */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <CurrentTime />

        <UserInfo />

        <ThemeToggle />

        <UserMenu />
      </div>
    </header>
  );
};

export default Topbar;
