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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { manageStock } from "~/redux/features/Stock/stockSlice";
import { getToken, getUserId } from "~/components/getLocalStorage";

type Stock = {
  itemId: number;
  itemName: string;
  itemModel: string;
};

type StockProps = {
  className?: string;
  stock: Stock;
  onSubmit: (formData: FormData) => void;
};

export function StockUpdate({ stock }: { stock: Stock }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const token = getToken();

  const dispatch = useAppDispatch();
  const handleUpdate = (formData: FormData) => {
    if (token) {
      dispatch(
        manageStock({
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
            <Plus /> Update Stock
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] text-black dark:text-white">
          <DialogHeader>
            <DialogTitle>Update Stock</DialogTitle>
            <DialogDescription>
              Give info here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-auto">
            <StockCreateForm stock={stock} onSubmit={handleUpdate} />
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
          Update Stock
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh] text-black dark:text-white">
        <DrawerHeader className="text-left">
          <DrawerTitle>Update Stock</DrawerTitle>
          <DrawerDescription>
            Give Info here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-auto overflow-auto px-4">
          <StockCreateForm stock={stock} onSubmit={handleUpdate} />
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

function StockCreateForm({ className, stock, onSubmit }: StockProps) {
  const userId = getUserId();
  const [formData, setFormData] = React.useState({
    quantity: "",
    actionType: "",
  });

  const formPayload = new FormData();
  formPayload.append("itemId", stock?.itemId.toString());
  formPayload.append("quantity", formData.quantity as string);
  formPayload.append("actionType", formData.actionType as string);
  formPayload.append("actionBy", userId as string);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, actionType: value });
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
      {/* item */}
      <div className="grid gap-2">
        <Label htmlFor="name">Item</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={stock.itemName}
          disabled
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="name">Item Model</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={stock.itemModel}
          disabled
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          type="text"
          id="quantity"
          name="quantity"
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="actionType">Action Type</Label>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Action Type</SelectLabel>
              <SelectItem value="plus">Plus</SelectItem>
              <SelectItem value="minus">Minus</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
