import { useEffect, useState } from "react";
import { DataTable } from "~/components/custom-data-table/data-table";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { DataTableSkeleton } from "~/components/datatableskeleton";
import { Separator } from "~/components/ui/separator";
import { DepartmentCreate } from "./department-create";
import { toast } from "sonner";
import { getAllDepartment } from "~/redux/features/Department/departmentSlice";
import { columns } from "~/components/columns/department-columns";
import { getToken } from "~/components/getLocalStorage";

const Department = () => {
  const token = getToken();
  const dispatch = useAppDispatch();
  const [isAttempted, setIsAttempted] = useState<boolean>(true);
  const { loading, data, refresh } = useAppSelector(
    (state) => state.departments
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
      dispatch(getAllDepartment({ token }));
    }
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
