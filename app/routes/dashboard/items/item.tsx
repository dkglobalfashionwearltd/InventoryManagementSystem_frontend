import React, { useEffect, useState } from "react";
import { DataTable } from "~/components/custom-data-table/data-table";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { DataTableSkeleton } from "~/components/datatableskeleton";
import { Separator } from "~/components/ui/separator";
import { useToken } from "~/components/getToken";
import { toast } from "sonner";
import { columns } from "~/components/columns/item-columns";
import { getAllItem } from "~/redux/features/Item/itemSlice";
import { ItemCreate } from "./item-create";
import { Button } from "~/components/ui/button";
import { Plus, PlusCircle } from "lucide-react";
import { Link, Outlet } from "react-router";

const Item = () => {
  const token = useToken() as string;
  const dispatch = useAppDispatch();
  const [isAttempted, setIsAttempted] = useState<boolean>(true);
  const { loading, data, refresh } = useAppSelector((state) => state.items);

  useEffect(() => {
    fetchProducts();
    setIsAttempted(false);
  }, [refresh]);

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
    await dispatch(getAllItem({ token }));
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
        filterWith="serialNumber"
      />
    </div>
  );
};

export default Item;
