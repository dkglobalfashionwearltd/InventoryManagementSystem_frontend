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
import { Textarea } from "~/components/ui/textarea";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { Plus } from "lucide-react";
import { getAllItem } from "~/redux/features/Item/itemSlice";
import { useToken, useUserId } from "~/components/getToken";
import ComboboxForStock, {
  type ComboboxOption,
} from "~/components/comboboxForStock";
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

type Stock = {
  itemId: number;
  quantity: string;
  actionType: string;
  actionBy: string;
};

type StockProps = {
  className?: string;
  onSubmit: (formData: FormData, isClick: boolean) => void;
};

export function StockCreate() {
  // const url = window.location.origin;
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const token = useToken() as string;

  const dispatch = useAppDispatch();
  const handleUpdate = async (formData: FormData, isClick: boolean) => {
    dispatch(
      manageStock({
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
            <Plus /> Add Stock
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] text-black dark:text-white">
          <DialogHeader>
            <DialogTitle>Add Stock</DialogTitle>
            <DialogDescription>
              Give info here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-auto">
            <StockCreateForm onSubmit={handleUpdate} />
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
          Add Stock
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh] text-black dark:text-white">
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Stock</DrawerTitle>
          <DrawerDescription>
            Give Info here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-auto overflow-auto px-4">
          <StockCreateForm onSubmit={handleUpdate} />
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

function StockCreateForm({ className, onSubmit }: StockProps) {
  const userId = useUserId();
  const [formData, setFormData] = React.useState({
    itemId: "",
    quantity: "",
    actionType: "",
  });
  const [selectedItems, setSelectedItems] =
    React.useState<ComboboxOption | null>(null);
  const dispatch = useAppDispatch();
  const token = useToken() as string;
  const { loading, data } = useAppSelector((state) => state.items);

  React.useEffect(() => {
    dispatch(getAllItem({ token }));
  }, [dispatch, token]);

  const formPayload = new FormData();
  formPayload.append("itemId", formData.itemId as string);
  formPayload.append("quantity", formData.quantity as string);
  formPayload.append("actionType", "create" as string);
  formPayload.append("actionBy", userId as string);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, actionType: value });
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
      {/* Category */}
      <div className="flex flex-col gap-1 min-w-0">
        <Label className="text-sm font-medium">Items</Label>
        <ComboboxForStock
          options={data?.result ?? []}
          value={selectedItems}
          onChange={(opt) => {
            setSelectedItems(opt);
            setFormData((prev) => ({
              ...prev,
              itemId: opt?.itemId.toString() ?? "",
            }));
          }}
          placeholder="Choose a Item"
          renderOption={(opt) => (
            <div className="flex items-center gap-3">
              <div className="truncate">{opt.name}</div>
            </div>
          )}
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
      <Button type="submit">Save changes</Button>
    </form>
  );
}
