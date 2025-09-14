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
import { createItem } from "~/redux/features/Item/itemSlice";
import { getAllCategory } from "~/redux/features/Category/categorySlice";
import LoadingSpinner from "~/components/loading";

type ItemProps = {
  className?: string;
  onSubmit: (formData: FormData, isClick: boolean) => void;
};

export function ItemCreate() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const token = useToken();

  const dispatch = useAppDispatch();
  const handleUpdate = async (formData: FormData, isClick: boolean) => {
    dispatch(
      createItem({
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
            <Plus /> Add Item
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] h-[35rem] overflow-auto text-black dark:text-white">
          <DialogHeader>
            <DialogTitle>Add Item</DialogTitle>
            <DialogDescription>
              Give info here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-auto overflow-auto px-4">
            <ItemCreateForm onSubmit={handleUpdate} />
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
          Add Item
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className="max-h-[90vh] text-black dark:text-white"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Item</DrawerTitle>
          <DrawerDescription>
            Give Info here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-auto overflow-auto px-4">
          <ItemCreateForm onSubmit={handleUpdate} />
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

function ItemCreateForm({ className, onSubmit }: ItemProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    modelNumber: "",
    serialNumber: "",
    brandName: "",
    price: "",
    purchaseDate: "",
    sourceName: "",
    sourcePhoneNumber: "",
    lastServicingDate: "",
    nextServicingDate: "",
    serviceProviderName: "",
    serviceProviderPhoneNumber: "",
    warrantyEnd: "",
    Quantity: "",
    itemCondition: "",
    categoryId: "",
    status: "",
  });
  const [selected, setSelected] = React.useState<ComboboxOption | null>(null);

  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.categories);
  const token = useToken();
  React.useEffect(() => {
    dispatch(getAllCategory({ token }));
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
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="LG"
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2 p-2">
        <Label htmlFor="modelNumber">Model Number</Label>
        <Input
          id="modelNumber"
          name="modelNumber"
          placeholder="DS-K1T5"
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2 p-2">
        <Label htmlFor="serialNumber">Serial Number</Label>
        <Input
          id="serialNumber"
          name="serialNumber"
          placeholder="FV12S3490"
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2 p-2">
        <Label htmlFor="brandName">Brand Name</Label>
        <Input
          id="brandName"
          name="brandName"
          placeholder="LG"
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2 p-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          placeholder="10,000"
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
          placeholder=""
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2 p-2">
        <Label htmlFor="warrantyDate">Warranty Date</Label>
        <Input
          type="date"
          id="warrantyDate"
          name="warrantyDate"
          placeholder=""
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2 p-2">
        <Label htmlFor="sourceName">Source Name</Label>
        <Input
          id="sourceName"
          name="sourceName"
          placeholder=""
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2 p-2">
        <Label htmlFor="sourcePhoneNumber">Source Phone Number</Label>
        <Input
          id="sourcePhoneNumber"
          name="sourcePhoneNumber"
          placeholder=""
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
          placeholder=""
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
          placeholder=""
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2 p-2">
        <Label htmlFor="serviceProviderName">Service Provider Name</Label>
        <Input
          id="serviceProviderName"
          name="serviceProviderName"
          placeholder=""
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
          placeholder="01X.."
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2 p-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          name="quantity"
          placeholder=""
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2 p-2">
        <Label htmlFor="itemCondition">Item Condition</Label>
        <Input
          id="itemCondition"
          name="itemCondition"
          placeholder="good, broken"
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
            setSelected(opt);
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
          placeholder="active/inactive"
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">
        {loading ? <LoadingSpinner /> : "Save changes"}
      </Button>
    </form>
  );
}
