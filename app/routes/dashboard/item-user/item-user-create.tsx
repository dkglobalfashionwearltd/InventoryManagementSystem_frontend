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
import { createItemUser } from "~/redux/features/Item-User/itemUserSlice";
import type { ComboboxOption } from "~/components/combobox";
import Combobox from "~/components/combobox";

type ItemUserProps = {
  className?: string;
  onSubmit: (formData: FormData, isClick: boolean) => void;
};

export function ItemUserCreate() {
  // const url = window.location.origin;
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const token = useToken();

  const dispatch = useAppDispatch();
  const handleUpdate = async (formData: FormData, isClick: boolean) => {
    dispatch(
      createItemUser({
        token,
        formPayload: formData,
      })
    );
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Plus /> Add ItemUser
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] max-2xl:h-[32rem] overflow-auto text-black dark:text-white">
          <DialogHeader>
            <DialogTitle>Add ItemUser</DialogTitle>
            <DialogDescription>
              Give info here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-auto overflow-auto px-4">
            <ItemUserCreateForm onSubmit={handleUpdate} />
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
        <Button variant="outline" className="flex items-center gap-2">
          <Plus />
          Add ItemUser
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className="max-h-[90vh] text-black dark:text-white"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DrawerHeader className="text-left">
          <DrawerTitle>Add ItemUser</DrawerTitle>
          <DrawerDescription>
            Give Info here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-auto overflow-auto px-4">
          <ItemUserCreateForm onSubmit={handleUpdate} />
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

function ItemUserCreateForm({ className, onSubmit }: ItemUserProps) {
  const [formData, setFormData] = React.useState({
    officeId: "",
    name: "",
    phoneNumber: "",
    designation: "",
    departmentId: "",
    status: "",
  });
  const [selected, setSelected] = React.useState<ComboboxOption | null>(null);

  const dispatch = useAppDispatch();
  const { loading, data, error } = useAppSelector((state) => state.departments);
  const token = useToken();
  React.useEffect(() => {
    dispatch(getAllDepartment({ token }));
  }, []);

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
          placeholder="1111"
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2 p-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="josef"
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2 p-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          placeholder="01XXXXXXXXX"
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2 p-2">
        <Label htmlFor="designation">Designation</Label>
        <Input
          id="designation"
          name="designation"
          placeholder="operation manager"
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2 p-2">
        <Label>Department</Label>
        <Combobox
          options={data?.result ?? []}
          value={selected}
          onChange={(opt) => {
            setSelected(opt);
            setFormData((prev) => ({
              ...prev,
              departmentId: opt?.departmentId.toString() as string,
            }));
          }}
          placeholder="Choose a Department"
          renderOption={(opt, highlighted) => (
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
          placeholder="active/inactive"
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
