import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/dashboard": {};
  "/dashboard/about-me": {};
  "/dashboard/items": {};
  "/dashboard/items/create": {};
  "/dashboard/items/update": {};
  "/dashboard/user": {};
  "/dashboard/categories": {};
  "/dashboard/departments": {};
  "/dashboard/item-users": {};
  "/dashboard/assign-to": {};
  "/dashboard/view-assign-data": {};
  "/auth/login": {};
  "/auth/sign-up": {};
};