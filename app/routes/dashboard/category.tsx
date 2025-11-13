import React, { useEffect, useState } from "react";
import { DataTable } from "~/components/custom-data-table/data-table";
import { columns } from "~/components/columns/category-columns";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { getAllCategory } from "~/redux/features/Category/categorySlice";
import { DataTableSkeleton } from "~/components/datatableskeleton";
import { Separator } from "~/components/ui/separator";
import { CategoryCreate } from "./category-create";
import { toast } from "sonner";
import { getToken } from "~/components/getLocalStorage";

const Category = () => {
  const token = getToken();
  const dispatch = useAppDispatch();
  const [isAttempted, setIsAttempted] = useState<boolean>(true);
  const { loading, data, refresh } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    fetchProducts();
    setIsAttempted(false);
  }, [dispatch, refresh, token]);

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
    if (token) {
      dispatch(getAllCategory({ token }));
    }
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
