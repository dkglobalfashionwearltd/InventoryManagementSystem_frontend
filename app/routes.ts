import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/root-route.tsx"),
  // Protect everything under /dashboard
  route("dashboard", "routes/dashboard/protected.tsx", [
    route("", "routes/dashboard/dashboard.tsx", [
      index("routes/dashboard/home.tsx"),
      route("about-me", "routes/dashboard/about.tsx"),
      route("items", "routes/dashboard/items/itemContainer.tsx", [
        index("routes/dashboard/items/item.tsx"),
        route("create", "routes/dashboard/items/createItem.tsx"),
        route("update", "routes/dashboard/items/updateItem.tsx"),
      ]),
      route("user", "routes/dashboard/ApplicationUser/user.tsx"),
      route("categories", "routes/dashboard/category.tsx"),
      route("departments", "routes/dashboard/department/department.tsx"),
      route("item-users", "routes/dashboard/item-user/item-user.tsx"),
      route("assign-to", "routes/dashboard/assign/assignTo.tsx"),
      route("view-assign-data", "routes/dashboard/assign/view-assignment.tsx"),
    ]),
  ]),
  route("auth/login", "routes/auth/login.tsx"),
  route("auth/sign-up", "routes/auth/sign-up.tsx"),
] satisfies RouteConfig;
