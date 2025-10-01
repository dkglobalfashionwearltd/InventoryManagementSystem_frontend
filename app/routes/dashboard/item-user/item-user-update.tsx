import * as React from "react";

import { cn } from "~/lib/utils";
import { useMediaQuery } from "~/hooks/use-media-query";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { Plus } from "lucide-react";
import { useToken } from "~/components/getToken";
import { getAllDepartment } from "~/redux/features/Department/departmentSlice";
import {
  createItemUser,
  updateItemUser,
} from "~/redux/features/Item-User/itemUserSlice";
import type { ComboboxOption } from "~/components/combobox";
import Combobox from "~/components/combobox";

type ItemUser = {
  itemUserId: number;
  officeId: number;
  name: string;
  phoneNumber: string;
  designation: string;
  department: {
    departmentId: string;
    name: string;
  };
  status: string;
};
type ItemUserUpdateProps = {
  itemUser: ItemUser;
};
type ItemUserProps = {
  itemUser: ItemUser;
  className?: string;
  onSubmit: (formData: FormData, isClick: boolean) => void;
};

export function ItemUserUpdate({ itemUser }: ItemUserUpdateProps) {
  // const url = window.location.origin;
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const token = useToken();

  const dispatch = useAppDispatch();
  const handleUpdate = async (formData: FormData, isClick: boolean) => {
    dispatch(
      updateItemUser({
        token,
        formPayload: formData,
      })
    );
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] max-2xl:h-[32rem] overflow-auto text-black dark:text-white">
          <DialogHeader>
            <DialogTitle>Edit ItemUser</DialogTitle>
            <DialogDescription>
              Make changes here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-auto overflow-auto px-4">
            <ItemUserUpdateForm itemUser={itemUser} onSubmit={handleUpdate} />
          </ScrollArea>
          <DialogFooter className="pt-2 p-0 mb-5 mt-2">
            <DialogClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DrawerTrigger>
      <DrawerContent
        className="max-h-[90vh] text-black dark:text-white"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit ItemUser</DrawerTitle>
          <DrawerDescription>
            Make changes here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-auto overflow-auto px-4">
          <ItemUserUpdateForm itemUser={itemUser} onSubmit={handleUpdate} />
          <DrawerFooter className="p-0 mb-5 mt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

function ItemUserUpdateForm({ className, itemUser, onSubmit }: ItemUserProps) {
  const [formData, setFormData] = React.useState({
    itemUserId: itemUser.itemUserId,
    officeId: itemUser.officeId,
    name: itemUser.name,
    phoneNumber: itemUser.phoneNumber,
    designation: itemUser.designation,
    departmentId: itemUser.department.departmentId,
    status: itemUser.status,
  });

  const dispatch = useAppDispatch();
  const { loading, data, error } = useAppSelector((state) => state.departments);
  const token = useToken();

  // load departments on mount
  React.useEffect(() => {
    dispatch(getAllDepartment({ token }));
  }, [dispatch, token]);

  // recompute department option every render
  const selectedDepartment =
    data?.result?.find(
      (d: any) => String(d.departmentId) === String(formData.departmentId)
    ) ?? null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formPayload = new FormData();
    Object.entries(formData).forEach(([k, v]) =>
      formPayload.append(k, String(v ?? ""))
    );
    onSubmit(formPayload, true);
  };

  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2 p-2">
        <Label htmlFor="officeId">Office Id</Label>
        <Input
          id="officeId"
          name="officeId"
          value={formData.officeId}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2 p-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2 p-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2 p-2">
        <Label htmlFor="designation">Designation</Label>
        <Input
          id="designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2 p-2">
        <Label>Department</Label>
        <Combobox
          options={data?.result ?? []}
          value={selectedDepartment}
          onChange={(opt) => {
            setFormData((prev) => ({
              ...prev,
              departmentId: opt?.departmentId?.toString() ?? "",
            }));
          }}
          placeholder={
            loading ? "Loading departments..." : "Choose a Department"
          }
          renderOption={(opt) => (
            <div className="flex items-center gap-3">
              <div className="min-w-0">
                <div className="truncate">{opt.name}</div>
              </div>
            </div>
          )}
        />
      </div>

      <div className="grid gap-2 p-2">
        <Label htmlFor="status">Status</Label>
        <Input
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit">Save changes</Button>
    </form>
  );
}
