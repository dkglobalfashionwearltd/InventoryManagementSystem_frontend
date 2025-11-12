import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/auth/login": {};
  "/auth/sign-up": {};
  "/dashboard": {};
  "/dashboard/about-me": {};
  "/dashboard/items": {};
  "/dashboard/items/create": {};
  "/dashboard/items/update": {};
  "/dashboard/users": {};
  "/dashboard/stocks": {};
  "/dashboard/stocks/create": {};
  "/dashboard/categories": {};
  "/dashboard/departments": {};
  "/dashboard/item-users": {};
  "/dashboard/assign-to": {};
  "/dashboard/view-assign-data": {};
};