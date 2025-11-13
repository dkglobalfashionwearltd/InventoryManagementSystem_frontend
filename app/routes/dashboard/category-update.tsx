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
import { updateCategory } from "~/redux/features/Category/categorySlice";
import { getToken } from "~/components/getLocalStorage";

type category = {
  categoryId: number;
  name: string;
  status: string;
};
type CateogryUpdateProps = {
  category: category;
};
type CateogryProps = {
  category: category;
  className?: string;
  onSubmit: (formData: FormData, isClick: boolean) => void;
};

export function CategoryUpdate({ category }: CateogryUpdateProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const token = getToken();
  const dispatch = useAppDispatch();

  const handleUpdate = async (formData: FormData, isClick: boolean) => {
    if (token) {
      dispatch(
        updateCategory({
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
          <Button variant="outline">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] text-black dark:text-white">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Make changes here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-auto">
            <ProductUpdateForm category={category} onSubmit={handleUpdate} />
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
        <Button variant="outline">Edit</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh] text-black dark:text-white">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Category</DrawerTitle>
          <DrawerDescription>
            Make changes here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-auto overflow-auto px-4">
          <ProductUpdateForm category={category} onSubmit={handleUpdate} />
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

function ProductUpdateForm({ className, category, onSubmit }: CateogryProps) {
  console.log(category?.name);

  const [formData, setFormData] = React.useState({
    categoryId: category?.categoryId,
    name: category?.name,
    status: category?.status,
  });

  const formPayload = new FormData();
  formPayload.append("categoryId", formData.categoryId.toString() as string);
  formPayload.append("name", formData.name as string);
  formPayload.append("status", formData.status as string);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formPayload, true);
  };

  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Category Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
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
      <Button type="submit">Save changes</Button>
    </form>
  );
}
