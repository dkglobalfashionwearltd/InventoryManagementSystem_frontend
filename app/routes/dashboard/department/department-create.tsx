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
import { useAppDispatch } from "~/redux/hook";
import { Plus } from "lucide-react";
import { createDepartment } from "~/redux/features/Department/departmentSlice";
import { getToken } from "~/components/getLocalStorage";

type CateogryProps = {
  className?: string;
  onSubmit: (formData: FormData) => void;
};

export function DepartmentCreate() {
  // const url = window.location.origin;
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const token = getToken();

  const dispatch = useAppDispatch();
  const handleUpdate = async (formData: FormData) => {
    if (token) {
      dispatch(
        createDepartment({
          token,
          formPayload: formData,
        })
      );
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Plus /> Add Department
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] text-black dark:text-white">
          <DialogHeader>
            <DialogTitle>Add Department</DialogTitle>
            <DialogDescription>
              Give info here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-auto">
            <DepartmentCreateForm onSubmit={handleUpdate} />
          </ScrollArea>
          <DialogFooter className="pt-2">
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
          Add Department
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh] text-black dark:text-white">
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Department</DrawerTitle>
          <DrawerDescription>
            Give Info here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-auto overflow-auto px-4">
          <DepartmentCreateForm onSubmit={handleUpdate} />
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

function DepartmentCreateForm({ className, onSubmit }: CateogryProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    status: "",
  });

  const formPayload = new FormData();
  formPayload.append("name", formData.name as string);
  formPayload.append("status", formData.status as string);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formPayload);
  };

  return (
    <form
      className={cn("grid items-start gap-4", className)}
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Department Name</Label>
        <Input
          type="text"
          id="name"
          placeholder="IT"
          name="name"
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <Input
          type="text"
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
