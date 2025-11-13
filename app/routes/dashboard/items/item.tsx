import React, { useEffect, useState } from "react";
import { DataTable } from "~/components/custom-data-table/data-table";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { DataTableSkeleton } from "~/components/datatableskeleton";
import { Separator } from "~/components/ui/separator";
import { toast } from "sonner";
import { columns } from "~/components/columns/item-columns";
import { getAllItem } from "~/redux/features/Item/itemSlice";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router";
import { getToken } from "~/components/getLocalStorage";

const Item = () => {
  const token = getToken();
  const dispatch = useAppDispatch();
  const [isAttempted, setIsAttempted] = useState<boolean>(true);
  const { loading, data, refresh } = useAppSelector((state) => state.items);

  useEffect(() => {
    fetchProducts();
    setIsAttempted(false);
  }, [dispatch, token, refresh]);

  // toaster
  useEffect(() => {
    if (isAttempted) return;
    const ShowToast = data?.success ? toast.success : toast.error;
    ShowToast(data?.statusCode ?? data?.code, {
      description: data?.message,
      position: "top-right",
      richColors: true,
    });
  }, [refresh]);

  const fetchProducts = async () => {
    if (token) {
      await dispatch(getAllItem({ token }));
    }
  };
  return loading ? (
    <DataTableSkeleton />
  ) : (
    <div className="w-full text-black dark:text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl ">Item List</h1>
        <Link to={"/dashboard/items/create"}>
          <Button variant={"outline"}>
            <PlusCircle /> Add Item
          </Button>
        </Link>
      </div>
      <Separator className="mt-4" />
      <DataTable
        columns={columns}
        data={data?.result || []}
        filterWith="modelNumber"
      />
    </div>
  );
};

export default Item;
