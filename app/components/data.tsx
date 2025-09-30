import {
  LayoutDashboardIcon,
  ListIcon,
  User2Icon,
  Menu,
  Blocks,
  ArrowLeftRightIcon,
} from "lucide-react";

export const baseUrl = "https://inventory.cookiesoftwareltd.com:4200";
// export const baseUrl = "http://118.179.121.96:4200";
// export const baseUrl = "http://192.168.2.215:801";
// export const baseUrl = "https://localhost:7189";
// export const baseUrl = "http://192.168.0.231:801";

export const NavMenu = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Items",
    url: "/dashboard/items",
    icon: Menu,
  },
  {
    title: "ItemUsers",
    url: "/dashboard/item-users",
    icon: User2Icon,
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: ListIcon,
  },
  {
    title: "Departments",
    url: "/dashboard/departments",
    icon: Blocks,
  },
  {
    title: "AssignTo",
    url: "/dashboard/assign-to",
    icon: ArrowLeftRightIcon,
  },
];
export const User = {
  name: "user name",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};
