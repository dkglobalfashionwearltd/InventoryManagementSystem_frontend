import { type ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "../ui/button";
import { format, parseISO } from "date-fns";
import { StockUpdate } from "~/routes/dashboard/stocks/stock-update";

type Stock = {
  stockId: number;
  itemId: number;
  itemName: string;
  itemModel: string;
  totalGivenQuantity: string;
  lastQuantity: string;
  currentQuantity: string;
  purchaseDate: string;
  stockedAt: string;
  lastStockedAt: string;
  stockOutAt: string;
  stockCount: string;
};

export const columns: ColumnDef<Stock>[] = [
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
    accessorKey: "stockId",
    header: "Stock Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("stockId")}</div>
    ),
  },
  {
    accessorKey: "itemId",
    header: "Item Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("itemId")}</div>
    ),
  },
  {
    accessorKey: "itemName",
    header: "Item Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("itemName")}</div>
    ),
  },
  {
    accessorKey: "itemModel",
    header: "Item Model",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("itemModel")}</div>
    ),
  },

  {
    accessorKey: "totalGivenQuantity",
    header: "Total Stocked",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("totalGivenQuantity")}</div>
    ),
  },
  {
    accessorKey: "lastQuantity",
    header: "Last Stocked",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lastQuantity")}</div>
    ),
  },
  {
    accessorKey: "currentQuantity",
    header: "Current Stocks",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("currentQuantity")}</div>
    ),
  },
  {
    accessorKey: "stockedAt",
    header: "Stock Date",
    cell: ({ row }) => {
      const formatDate = (dateString: string) => {
        try {
          return format(parseISO(dateString), "MMMM dd, yyyy");
        } catch {
          return dateString;
        }
      };
      return (
        <div className="capitalize">
          {formatDate(row?.getValue("stockedAt"))}
        </div>
      );
    },
  },
  {
    accessorKey: "lastStockedAt",
    header: "Last Stocked Date",
    cell: ({ row }) => {
      const formatDate = (dateString: string) => {
        try {
          return format(parseISO(dateString), "MMMM dd, yyyy");
        } catch {
          return dateString;
        }
      };
      return (
        <div className="capitalize">
          {formatDate(row.getValue("lastStockedAt"))}
        </div>
      );
    },
  },
  {
    accessorKey: "stockOutAt",
    header: "Stock Out Date",
    cell: ({ row }) => {
      const formatDate = (dateString: string) => {
        try {
          return format(parseISO(dateString), "MMMM dd, yyyy");
        } catch {
          return dateString;
        }
      };
      return (
        <div className="capitalize">
          {formatDate(row.getValue("stockOutAt") ?? "N/A")}
        </div>
      );
    },
  },
  {
    accessorKey: "stockCount",
    header: "Stock Count",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("stockCount")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const stock = row.original;

      return (
        <div className="flex gap-4">
          <StockUpdate stock={stock} />
        </div>
      );
    },
  },
];
