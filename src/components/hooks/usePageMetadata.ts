import { useLocation } from "react-router-dom";
import { pageMetadata } from "../config/pageMetadata";

export const usePageMetadata = () => {
  const { pathname } = useLocation();

  return (
    pageMetadata[pathname as keyof typeof pageMetadata] ?? {
      title: "StockPilot",
      subtitle: "",
    }
  );
};
