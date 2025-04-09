import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "Cooperativas";
    case "/cooperados":
      return "Cooperados";
    case "/contatos":
      return "Contatos Favoritos";
    default:
      return "Cooperativa";
  }
};

export default function PageTitle() {
  const location = useLocation();

  useEffect(() => {
    const title = getPageTitle(location.pathname);
    document.title = `${title} - Cooperativa`;
  }, [location.pathname]);

  return null;
}
