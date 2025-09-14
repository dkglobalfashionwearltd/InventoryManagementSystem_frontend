import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "~/components/ui/checkbox";
import { CategoryStatus } from "~/routes/dashboard/category-Status";
import { CategoryUpdate } from "~/routes/dashboard/category-update";

export type Category = {
  categoryId: number;
  name: string;
  status: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "categoryId",
    header: "Category Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("categoryId")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const cateogry = row.original;

      return (
        <div className="flex gap-4">
          <CategoryUpdate category={cateogry} />
          <CategoryStatus category={cateogry} />
        </div>
      );
    },
  },
];
