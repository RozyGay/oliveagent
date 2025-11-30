import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import AdminPanelPage from "../pages/AdminPanel";

export const adminPanelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-panel",
  component: AdminPanelPage,
});
