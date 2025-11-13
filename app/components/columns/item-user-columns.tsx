import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "~/components/ui/checkbox";
import { DepartmentUpdate } from "~/routes/dashboard/department/department-update";
import { DepartmentStatus } from "~/routes/dashboard/department/department-Status";
import { ItemUserUpdate } from "~/routes/dashboard/item-user/item-user-update";
import { ItemUserStatusUpdate } from "~/routes/dashboard/item-user/item-user-Status";

type ItemUser = {
  itemUserId: number;
  officeId: number;
  name: string;
  phoneNumber: string;
  designation: string;
  department: {
    departmentId: string;
    name: string;
  };
  status: string;
};

export const columns: ColumnDef<ItemUser>[] = [
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
    accessorKey: "itemUserId",
    header: "Item-User Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("itemUserId")}</div>
    ),
  },
  {
    accessorKey: "officeId",
    header: "Office Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("officeId")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "User Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "designation",
    header: "Designation",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("designation")}</div>
    ),
  },
  {
    accessorKey: "departmentName",
    header: "Department Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.original?.department.name}</div>
    ),
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
      const itemUser = row.original;

      return (
        <div className="flex gap-4">
          <ItemUserUpdate itemUser={itemUser} />
          <ItemUserStatusUpdate itemUser={itemUser} />
          {/* <DepartmentStatus department={department} /> */}
        </div>
      );
    },
  },
];
