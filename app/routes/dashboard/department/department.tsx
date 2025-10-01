import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "~/components/custom-data-table/data-table";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { DataTableSkeleton } from "~/components/datatableskeleton";
import { Separator } from "~/components/ui/separator";
import { DepartmentCreate } from "./department-create";
import { useToken } from "~/components/getToken";
import { toast } from "sonner";
import { getAllDepartment } from "~/redux/features/Department/departmentSlice";
import { columns } from "~/components/columns/department-columns";

const Department = () => {
  const token = useToken() as string;
  const dispatch = useAppDispatch();
  const [isAttempted, setIsAttempted] = useState<boolean>(true);
  const { loading, data, error, refresh } = useAppSelector(
    (state) => state.departments
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

  const fetchProducts = async () => {
    await dispatch(getAllDepartment({ token }));
  };

  return loading ? (
    <DataTableSkeleton />
  ) : (
    <div className="w-full text-black dark:text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl ">Department List</h1>
        <DepartmentCreate />
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

export default Department;
