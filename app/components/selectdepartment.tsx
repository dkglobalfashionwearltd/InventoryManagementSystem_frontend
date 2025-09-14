import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { useToken } from "./getToken";
import React from "react";
import { getAllDepartment } from "~/redux/features/Department/departmentSlice";

export function DepartmentSelectBasic({ value, onChange }) {
  const dispatch = useAppDispatch();
  const token = useToken();
  const { data, loading } = useAppSelector((s) => s.departments);

  React.useEffect(() => {
    dispatch(getAllDepartment({ token }));
  }, [dispatch, token]);

  const list = Array.isArray(data?.result) ? data.result : [];

  return (
    <Select value={value?.toString() ?? ""} onValueChange={(v) => onChange(v)}>
      <SelectTrigger className="w-[260px]">
        <SelectValue
          placeholder={loading ? "Loading..." : "Select department..."}
        />
      </SelectTrigger>
      <SelectContent className="z-[9999]">
        {list.map((d) => (
          <SelectItem key={d.departmentId} value={String(d.departmentId)}>
            {d.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
