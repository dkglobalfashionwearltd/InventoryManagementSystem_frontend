// ~/utils/dashboardStats.ts

import dayjs from "dayjs";

// ---- ITEMS ----

// Items added in the last X months
export function getItemsAddedRecently(items: any[], months = 6) {
  if (!items) return 0;
  const cutoff = dayjs().subtract(months, "month");
  return items.filter((i) => dayjs(i.purchaseDate).isAfter(cutoff)).length;
}

// Items due for servicing within next X days
export function getItemsDueForServicing(items: any[], days = 30) {
  if (!items) return 0;
  const cutoff = dayjs().add(days, "day");
  return items.filter(
    (i) => i.nextServicingDate && dayjs(i.nextServicingDate).isBefore(cutoff)
  ).length;
}

// ---- ASSIGNMENTS ----

// Total number of assignments (sum of all assigned items)
export function getTotalAssignments(assignTo: any[]) {
  if (!assignTo) return 0;
  return assignTo.reduce((acc, user) => acc + (user.items?.length || 0), 0);
}

// Most assigned item
export function getMostAssignedItem(assignTo: any[]) {
  if (!assignTo) return null;
  const countMap: Record<string, number> = {};

  assignTo.forEach((user) => {
    user.items?.forEach((item: any) => {
      countMap[item.name] = (countMap[item.name] || 0) + 1;
    });
  });

  const sorted = Object.entries(countMap).sort((a, b) => b[1] - a[1]);
  return sorted[0] ? { name: sorted[0][0], count: sorted[0][1] } : null;
}

// ---- USERS ----

// Active users
export function getActiveUsers(itemUsers: any[]) {
  if (!itemUsers) return 0;
  return itemUsers.filter((u) => u.status === "active").length;
}

// ---- CATEGORIES ----

// Most popular category (by item count)
export function getPopularCategory(items: any[]) {
  if (!items) return null;
  const countMap: Record<string, number> = {};

  items.forEach((item) => {
    const cat = item.category?.name || "Uncategorized";
    countMap[cat] = (countMap[cat] || 0) + 1;
  });

  const sorted = Object.entries(countMap).sort((a, b) => b[1] - a[1]);
  return sorted[0] ? { name: sorted[0][0], count: sorted[0][1] } : null;
}
