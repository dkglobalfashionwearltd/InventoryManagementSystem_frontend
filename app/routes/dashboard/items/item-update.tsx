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
import ComboboxItem, { type ComboboxOption } from "~/components/comboboxItem";
import { updateItem } from "~/redux/features/Item/itemSlice";
import { getAllCategory } from "~/redux/features/Category/categorySlice";

type Item = {
  itemId: number;
  name: string;
  modelNumber: string;
  serialNumber: string;
  brandName: string;
  price: number;
  purchaseDate: string;
  sourceName: string;
  sourcePhoneNumber: string;
  lastServicingDate: string;
  nextServicingDate: string;
  serviceProviderName: string;
  serviceProviderPhoneNumber: string;
  category: {
    categoryId: number;
    name: string;
    status: string;
  };
  status: string;
};

type ItemUdateProps = {
  item: Item;
};

type ItemProps = {
  item: Item;
  className?: string;
  onSubmit: (formData: FormData, isClick: boolean) => void;
};

export function ItemUpdate({ item }: ItemUdateProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const token = useToken();

  const dispatch = useAppDispatch();
  const handleUpdate = async (formData: FormData, isClick: boolean) => {
    dispatch(
      updateItem({
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
        <DialogContent className="sm:max-w-[525px] h-[35rem] overflow-auto text-black dark:text-white">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Make changes here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-auto overflow-auto px-4">
            <ItemUpdateForm item={item} onSubmit={handleUpdate} />
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
          <DrawerTitle>Edit Item</DrawerTitle>
          <DrawerDescription>
            Make changes here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-auto overflow-auto px-4">
          <ItemUpdateForm item={item} onSubmit={handleUpdate} />
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

function ItemUpdateForm({ className, item, onSubmit }: ItemProps) {
  const [formData, setFormData] = React.useState({
    name: item.name,
    modelNumber: item.modelNumber,
    serialNumber: item.serialNumber,
    brandName: item.brandName,
    price: item.price,
    purchaseDate: item.purchaseDate,
    sourceName: item.sourceName,
    sourcePhoneNumber: item.sourcePhoneNumber,
    lastServicingDate: item.lastServicingDate,
    nextServicingDate: item.nextServicingDate,
    serviceProviderName: item.serviceProviderName,
    serviceProviderPhoneNumber: item.serviceProviderPhoneNumber,
    categoryId: item.category.categoryId.toString(),
    status: item.status,
  });

  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.categories);
  const token = useToken();
  React.useEffect(() => {
    dispatch(getAllCategory({ token }));
  }, []);

  // recompute department option every render
  const selected =
    data?.result?.find(
      (d: any) => String(d.categoryId) === String(formData.categoryId)
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
        <Label htmlFor="modelNumber">Model Number</Label>
        <Input
          id="modelNumber"
          name="modelNumber"
          value={formData.modelNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2 p-2">
        <Label htmlFor="serialNumber">Serial Number</Label>
        <Input
          id="serialNumber"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2 p-2">
        <Label htmlFor="brandName">Brand Name</Label>
        <Input
          id="brandName"
          name="brandName"
          value={formData.brandName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2 p-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2 p-2">
        <Label htmlFor="purchaseDate">Purchase Date</Label>
        <Input
          type="date"
          id="purchaseDate"
          name="purchaseDate"
          value={formData.purchaseDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2 p-2">
        <Label htmlFor="sourceName">Source Name</Label>
        <Input
          id="sourceName"
          name="sourceName"
          value={formData.sourceName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2 p-2">
        <Label htmlFor="sourcePhoneNumber">Source Phone Number</Label>
        <Input
          id="sourcePhoneNumber"
          name="sourcePhoneNumber"
          value={formData.sourcePhoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2 p-2">
        <Label htmlFor="lastServicingDate">Last Servicing Date</Label>
        <Input
          type="date"
          id="lastServicingDate"
          name="lastServicingDate"
          value={formData.lastServicingDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2 p-2">
        <Label htmlFor="nextServicingDate">Next Servicing Date</Label>
        <Input
          type="date"
          id="nextServicingDate"
          name="nextServicingDate"
          value={formData.nextServicingDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2 p-2">
        <Label htmlFor="serviceProviderName">Service Provider Name</Label>
        <Input
          id="serviceProviderName"
          name="serviceProviderName"
          value={formData.serviceProviderName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2 p-2">
        <Label htmlFor="serviceProviderPhoneNumber">
          Service Provider Phone Name
        </Label>
        <Input
          id="serviceProviderPhoneNumber"
          name="serviceProviderPhoneNumber"
          value={formData.serviceProviderPhoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2 p-2">
        <Label>Category</Label>
        <ComboboxItem
          options={data?.result ?? []}
          value={selected}
          onChange={(opt) => {
            setFormData((prev) => ({
              ...prev,
              categoryId: opt?.categoryId.toString() as string,
            }));
          }}
          placeholder="Choose a Category"
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
          value={formData.status}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
