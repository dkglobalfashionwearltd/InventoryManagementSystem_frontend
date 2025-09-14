import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "~/components/custom-data-table/data-table";
import { columns } from "~/components/columns/category-columns";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { getAllCategory } from "~/redux/features/Category/categorySlice";
import { DataTableSkeleton } from "~/components/datatableskeleton";
import { Separator } from "~/components/ui/separator";
import { CategoryCreate } from "./category-create";
import { useToken } from "~/components/getToken";
import { toast } from "sonner";

const Category = () => {
  const token = useToken();
  const dispatch = useAppDispatch();
  const [isAttempted, setIsAttempted] = useState<boolean>(true);
  const { loading, data, error, refresh } = useAppSelector(
    (state) => state.categories
  );

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

  const fetchProducts = () => {
    dispatch(getAllCategory({ token }));
  };

  return loading ? (
    <DataTableSkeleton />
  ) : (
    <div className="w-full text-black dark:text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl ">Category List</h1>
        <CategoryCreate />
      </div>
      <Separator className="mt-4" />
      <DataTable
        columns={columns}
        data={data?.result || []}
        filterWith="name"
      />
    </div>
  );
};

export default Category;
