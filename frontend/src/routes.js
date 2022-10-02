import { useRoutes } from "react-router-dom";
import NavOnly from "./layout/NavOnly";
import HeroPage from "./pages/HeroPage";
import HomePage from "./pages/HomePage";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <NavOnly />,
      children: [{ path: "", element: <HeroPage /> }],
    },
    {
      path: "/app",
      element: <NavOnly />,
      children: [{ path: "", element: <HomePage /> }],
    },
    { path: "*", element:"" },
  ]);
}