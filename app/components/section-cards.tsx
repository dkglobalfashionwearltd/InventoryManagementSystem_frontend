import { TrendingUpIcon } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { useEffect } from "react";

import { getAllItem } from "~/redux/features/Item/itemSlice";
import { getAllCategory } from "~/redux/features/Category/categorySlice";
import { getAllDepartment } from "~/redux/features/Department/departmentSlice";

import CardSkeleton from "./card-skeleton";

import {
  getItemsAddedRecently,
  getItemsDueForServicing,
  getTotalAssignments,
  getMostAssignedItem,
  getActiveUsers,
  getPopularCategory,
} from "./dashboardStarts";
import { getAllItemUser } from "~/redux/features/Item-User/itemUserSlice";
import { getAllAssignment } from "~/redux/features/assign/assignSlice";
import { getToken } from "./getLocalStorage";

export function SectionCards() {
  const token = getToken();
  const dispatch = useAppDispatch();

  // selectors
  const { loading: itemsLoading, data: items } = useAppSelector((s) => s.items);
  const { data: itemUsers } = useAppSelector((s) => s.itemUsers);
  const { data: categories } = useAppSelector((s) => s.categories);
  const { data: departments } = useAppSelector((s) => s.departments);
  const { data: assignTo } = useAppSelector((s) => s.assign);

  useEffect(() => {
    if (token) {
      dispatch(getAllItem({ token }));
      dispatch(getAllItemUser({ token }));
      dispatch(getAllCategory({ token }));
      dispatch(getAllDepartment({ token }));
      dispatch(getAllAssignment({ token }));
    }
  }, [dispatch, token]);

  if (itemsLoading) {
    return <CardSkeleton />;
  }

  // insights
  const itemsDue = getItemsDueForServicing(items?.result, 30);
  const itemsNew6Months = getItemsAddedRecently(items?.result, 6);

  const totalAssignments = getTotalAssignments(assignTo?.result);
  const mostAssignedItem = getMostAssignedItem(assignTo?.result);

  const activeUsers = getActiveUsers(itemUsers?.result);
  const popularCategory = getPopularCategory(items?.result);

  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-5 *:data-[slot=card]:shadow-xs *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
      {/* Items Card */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Items</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {items?.result?.length ?? 0}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />+
              {((itemsNew6Months / (items?.result?.length || 1)) * 100).toFixed(
                1
              )}
              %
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {itemsDue} items due for servicing soon
          </div>
          <div className="text-muted-foreground">
            {itemsNew6Months} new items in last 6 months
          </div>
        </CardFooter>
      </Card>

      {/* Item Users Card */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Item Users</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {itemUsers?.result?.length ?? 0}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />+
              {((activeUsers / (itemUsers?.result?.length || 1)) * 100).toFixed(
                1
              )}
              %
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {activeUsers} active users
          </div>
          <div className="text-muted-foreground">
            Top department: {/* optionally calculate top dept */}
          </div>
        </CardFooter>
      </Card>

      {/* Categories Card */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Categories</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {categories?.result?.length ?? 0}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              {/* optionally dynamic growth */}+{popularCategory?.count || 0}
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Most popular: {popularCategory?.name}
          </div>
          <div className="text-muted-foreground">
            {popularCategory?.count || 0} items in this category
          </div>
        </CardFooter>
      </Card>

      {/* Departments Card */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Departments</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {departments?.result?.length ?? 0}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              {/* optional dynamic % */}
              +0%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total departments
          </div>
          <div className="text-muted-foreground">
            {/* optionally show department with most items */}
          </div>
        </CardFooter>
      </Card>

      {/* Assignments Card */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Assignments</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {totalAssignments}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              {/* optionally dynamic % */}
              +0%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Most assigned item: {mostAssignedItem?.name || "N/A"}
          </div>
          <div className="text-muted-foreground">
            Assignments across all users
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
