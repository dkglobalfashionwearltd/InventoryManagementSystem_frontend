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
import { updateDepartment } from "~/redux/features/Department/departmentSlice";
import { getToken } from "~/components/getLocalStorage";

type ItemUser = {
  itemUserId: number;
  name: string;
  status: string;
};
type ItemUserStatusUpdateProps = {
  itemUser: ItemUser;
};
type ItemUserProps = {
  itemUser: ItemUser;
  className?: string;
  onSubmit: (formData: FormData) => void;
};

export function ItemUserStatusUpdate({ itemUser }: ItemUserStatusUpdateProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const token = getToken();

  const dispatch = useAppDispatch();
  const handleUpdate = async (formData: FormData) => {
    if (token) {
      dispatch(
        updateDepartment({
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
          <Button variant="destructive">Change Status</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] text-black dark:text-white">
          <DialogHeader>
            <DialogTitle>Change Status Item User</DialogTitle>
            <DialogDescription>
              Are you sure! you cannot undo this action.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-auto">
            <ItemUserStatusUpdateForm
              itemUser={itemUser}
              onSubmit={handleUpdate}
            />
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
        <Button variant="outline">Change Status</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh] text-black dark:text-white">
        <DrawerHeader className="text-left">
          <DrawerTitle>Change Status Item User</DrawerTitle>
          <DrawerDescription>
            Are you sure! you cannot undo this action.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-auto overflow-auto px-4">
          <ItemUserStatusUpdateForm
            itemUser={itemUser}
            onSubmit={handleUpdate}
          />
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

function ItemUserStatusUpdateForm({
  className,
  itemUser,
  onSubmit,
}: ItemUserProps) {
  const [formData, setFormData] = React.useState({
    itemUserId: itemUser?.itemUserId,
    name: itemUser?.name,
    status: itemUser?.status,
  });

  const formPayload = new FormData();
  formPayload.append("itemUserId", formData.itemUserId.toString() as string);
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
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Item User Name</Label>
        <Input
          type="text"
          disabled
          id="name"
          name="name"
          value={formData.name}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <Input
          type="text"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" variant={"destructive"}>
        Save Changes
      </Button>
    </form>
  );
}
