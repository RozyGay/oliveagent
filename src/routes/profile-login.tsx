import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import ProfileLoginPage from "../pages/ProfileLogin";

export const profileLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile-login",
  component: ProfileLoginPage,
});
