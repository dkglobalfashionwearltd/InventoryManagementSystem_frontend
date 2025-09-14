import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "~/components/ui/checkbox";
import { DepartmentUpdate } from "~/routes/dashboard/department/department-update";
import { DepartmentStatus } from "~/routes/dashboard/department/department-Status";
export type Department = {
  departmentId: number;
  name: string;
  status: string;
};

export const columns: ColumnDef<Department>[] = [
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
    accessorKey: "departmentId",
    header: "Department Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("departmentId")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Department Name",
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
      const department = row.original;

      return (
        <div className="flex gap-4">
          <DepartmentUpdate department={department} />
          <DepartmentStatus department={department} />
        </div>
      );
    },
  },
];
