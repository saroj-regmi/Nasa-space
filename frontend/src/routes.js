import { useRoutes } from "react-router-dom";
import NavOnly from "./layout/NavOnly";
import HomePage from "./pages/HomePage";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <NavOnly />,
      children: [{ path: "", element: <HomePage /> }],
    },
    { path: "*", element:"" },
  ]);
}