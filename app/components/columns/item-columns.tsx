import { type ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import { Checkbox } from "~/components/ui/checkbox";
import UpdateItem from "~/routes/dashboard/items/updateItem";
import { Button } from "../ui/button";

type Item = {
  itemId: number;
  name: string;
  modelNumber: string;
  serialNumber: string;
  brandName: string;
  price: number;
  purchaseDate: string;
  sourceName: string;
  sourcePhoneNumber: string;
  lastServicingDate: string;
  nextServicingDate: string;
  serviceProviderName: string;
  serviceProviderPhoneNumber: string;
  itemCondition: string;
  quantity: string;
  warrantyEnd: string;
  category: {
    categoryId: number;
    name: string;
    status: string;
  };
  status: string;
};

export const columns: ColumnDef<Item>[] = [
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
    accessorKey: "itemId",
    header: "Item Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("itemId")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "User Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "modelNumber",
    header: "Model Number",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("modelNumber")}</div>
    ),
  },
  {
    accessorKey: "serialNumber",
    header: "Serial Number",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("serialNumber")}</div>
    ),
  },

  {
    accessorKey: "brandName",
    header: "Brand Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("brandName")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("price")}</div>
    ),
  },
  {
    accessorKey: "purchaseDate",
    header: "Purchase Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("purchaseDate")}</div>
    ),
  },
  {
    accessorKey: "warrantyEnd",
    header: "Warranty End",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("warrantyEnd")}</div>
    ),
  },
  {
    accessorKey: "sourceName",
    header: "Source Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sourceName")}</div>
    ),
  },
  {
    accessorKey: "sourcePhoneNumber",
    header: "Source Phone Number",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sourcePhoneNumber")}</div>
    ),
  },
  {
    accessorKey: "serviceProviderName",
    header: "Service Provider Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("serviceProviderName")}</div>
    ),
  },
  {
    accessorKey: "serviceProviderPhoneNumber",
    header: "Service Provider Phone Number",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("serviceProviderPhoneNumber")}
      </div>
    ),
  },
  {
    accessorKey: "lastServicingDate",
    header: "Last Servicing Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lastServicingDate")}</div>
    ),
  },
  {
    accessorKey: "nextServicingDate",
    header: "Next Servicing Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("nextServicingDate")}</div>
    ),
  },
  {
    accessorKey: "itemCondition",
    header: "Condition",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("itemCondition")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.category.name}</div>
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
      const item = row.original;

      return (
        <div className="flex gap-4">
          <Link to={"/dashboard/items/update"} state={{ item }}>
            <Button variant={"outline"}>Edit</Button>
          </Link>
        </div>
      );
    },
  },
];
