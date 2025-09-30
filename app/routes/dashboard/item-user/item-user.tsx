import React, { useEffect, useState } from "react";
import { DataTable } from "~/components/custom-data-table/data-table";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { DataTableSkeleton } from "~/components/datatableskeleton";
import { Separator } from "~/components/ui/separator";
import { useToken } from "~/components/getToken";
import { toast } from "sonner";
import { columns } from "~/components/columns/item-user-columns";
import { getAllItemUser } from "~/redux/features/Item-User/itemUserSlice";
import { ItemUserCreate } from "./item-user-create";

const ItemUser = () => {
  const token = useToken() as string;
  const dispatch = useAppDispatch();
  const [isAttempted, setIsAttempted] = useState<boolean>(true);
  const { loading, data, refresh } = useAppSelector((state) => state.itemUsers);

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
    await dispatch(getAllItemUser({ token }));
  };

  return loading ? (
    <DataTableSkeleton />
  ) : (
    <div className="w-full text-black dark:text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl ">Item User List</h1>
        <ItemUserCreate />
      </div>
      <Separator className="mt-4" />
      <DataTable
        columns={columns}
        data={data?.result || []}
        filterWith="itemUserId"
      />
    </div>
  );
};

export default ItemUser;
