import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/root-route.tsx"),

  route("auth/login", "routes/auth/login.tsx"),
  route("auth/sign-up", "routes/auth/sign-up.tsx"),

  // Protected dashboard routes via layout
  route("dashboard", "routes/dashboard/dashboard.tsx", [
    index("routes/dashboard/home.tsx"),
    route("about-me", "routes/dashboard/about.tsx"),
    route("items", "routes/dashboard/items/itemContainer.tsx", [
      index("routes/dashboard/items/item.tsx"),
      route("create", "routes/dashboard/items/createItem.tsx"),
      route("update", "routes/dashboard/items/updateItem.tsx"),
    ]),
    route("users", "routes/dashboard/application-user/user.tsx"),
    route("stocks", "routes/dashboard/stocks/stock.tsx"),
    route("stocks/create", "routes/dashboard/stocks/stock-create.tsx"),
    route("categories", "routes/dashboard/category.tsx"),
    route("departments", "routes/dashboard/department/department.tsx"),
    route("item-users", "routes/dashboard/item-user/item-user.tsx"),
    route("assign-to", "routes/dashboard/assign/assignTo.tsx"),
    route("view-assign-data", "routes/dashboard/assign/view-assignment.tsx"),
  ]),
] satisfies RouteConfig;
