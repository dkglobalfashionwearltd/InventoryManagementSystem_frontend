import React, { useEffect, useState } from "react";
import { columns } from "~/components/columns/stock-columns";
import { DataTable } from "~/components/custom-data-table/data-table";
import { DataTableSkeleton } from "~/components/datatableskeleton";

import { Separator } from "~/components/ui/separator";
import { getAllStock } from "~/redux/features/Stock/stockSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { StockCreate } from "./stock-create";
import { toast } from "sonner";

const Stock = () => {
  const dispatch = useAppDispatch();
  const [isAttempted, setIsAttempted] = useState<boolean>(true);
  const { loading, data, refresh } = useAppSelector((state) => state.stocks);

  useEffect(() => {
    fetchProducts();
    setIsAttempted(false);
  }, [dispatch, refresh]);

  // toaster
  useEffect(() => {
    if (isAttempted) return;
    const ShowToast = data?.success ? toast.success : toast.error;
    ShowToast(data?.statusCode ?? data?.code, {
      description: data?.message,
      position: "top-right",
      richColors: true,
    });
  }, [dispatch, refresh]);

  const fetchProducts = () => {
    dispatch(getAllStock({ token: "" }));
  };

  return loading ? (
    <DataTableSkeleton />
  ) : (
    <div className="w-full text-black dark:text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl ">Stock List</h1>
        <StockCreate />
      </div>
      <Separator className="mt-4" />
      <DataTable
        columns={columns}
        data={data?.result || []}
        filterWith="itemModel"
      />
    </div>
  );
};

export default Stock;
