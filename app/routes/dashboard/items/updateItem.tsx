import * as React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import ComboboxItem, { type ComboboxOption } from "~/components/comboboxItem";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { createItem, updateItem } from "~/redux/features/Item/itemSlice";
import { getAllCategory } from "~/redux/features/Category/categorySlice";
import { useToken } from "~/components/getToken";
import { useLocation, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "~/components/loading";

type Item = {
  itemId: number;
  name: string;
  modelNumber: string;
  brandName: string;
  price: number;
  purchaseDate: string;
  sourceName: string;
  sourcePhoneNumber: string;
  lastServicingDate: string;
  nextServicingDate: string;
  serviceProviderName: string;
  serviceProviderPhoneNumber: string;
  warrantyEnd: string;
  category: {
    categoryId: number;
    name: string;
    status: string;
  };
};

type ItemProps = {
  className?: string;
  // item: Item;
};

const UpdateItem = ({ className }: ItemProps) => {
  const location = useLocation();
  const item = location.state?.item;
  console.log("item", item);
  const [formData, setFormData] = React.useState({
    itemId: item?.itemId.toString() ?? "",
    name: item?.name ?? "",
    modelNumber: item?.modelNumber ?? "",
    brandName: item?.brandName ?? "",
    price: item?.price.toString() ?? "",
    purchaseDate: item?.purchaseDate ?? "",
    warrantyEnd: item?.warrantyEnd ?? "",
    sourceName: item?.sourceName ?? "",
    sourcePhoneNumber: item?.sourcePhoneNumber ?? "",
    lastServicingDate: item?.lastServicingDate ?? "",
    nextServicingDate: item?.nextServicingDate ?? "",
    serviceProviderName: item?.serviceProviderName ?? "",
    serviceProviderPhoneNumber: item?.serviceProviderPhoneNumber ?? "",
    categoryId: item?.category?.categoryId.toString() ?? "",
  });
  const [selectedCategory, setSelectedCategory] =
    React.useState<ComboboxOption | null>(null);

  const dispatch = useAppDispatch();
  const token = useToken() as string;
  const { data } = useAppSelector((state) => state.categories);
  const { loading: itemsLoading, data: items } = useAppSelector(
    (state) => state.items
  );
  const navigate = useNavigate();

  // recompute department option every render
  const selected =
    data?.result?.find(
      (d: any) => String(d.categoryId) === String(formData.categoryId)
    ) ?? null;

  React.useEffect(() => {
    dispatch(getAllCategory({ token }));
  }, [dispatch, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formPayload = new FormData();
    Object.entries(formData).forEach(([k, v]) =>
      formPayload.append(k, String(v ?? ""))
    );
    dispatch(updateItem({ token, formPayload }));
    navigate("/dashboard/items");
  };

  return (
    <ScrollArea className="h-auto overflow-auto">
      <div className="mb-4">
        <Button onClick={() => navigate(-1)} variant={"outline"} className="">
          <ArrowLeft />
          Go Back
        </Button>
      </div>
      <form
        className={`w-full max-w-full sm:max-w-2xl mx-auto space-y-4 ${
          className ?? ""
        }`}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              label: "Name",
              name: "name",
              placeholder: "LG",
              value: formData?.name,
            },
            {
              label: "Model Number",
              name: "modelNumber",
              placeholder: "DS-K1T5",
              value: formData?.modelNumber,
            },

            {
              label: "Brand Name",
              name: "brandName",
              placeholder: "LG",
              value: formData?.brandName,
            },
            {
              label: "Price",
              name: "price",
              placeholder: "10,000",
              value: formData?.price,
            },
            {
              label: "Purchase Date",
              name: "purchaseDate",
              type: "date",
              value: formData?.purchaseDate,
            },
            {
              label: "Warranty Date",
              name: "warrantyEnd",
              type: "date",
              value: formData?.warrantyEnd,
            },
            {
              label: "Source Name",
              name: "sourceName",
              value: formData?.sourceName,
            },
            {
              label: "Source Phone Number",
              name: "sourcePhoneNumber",
              value: formData?.sourcePhoneNumber,
            },
            {
              label: "Last Servicing Date",
              name: "lastServicingDate",
              type: "date",
              value: formData?.lastServicingDate,
            },
            {
              label: "Next Servicing Date",
              name: "nextServicingDate",
              type: "date",
              value: formData?.nextServicingDate,
            },
            {
              label: "Service Provider Name",
              name: "serviceProviderName",
              value: formData?.serviceProviderName,
            },
            {
              label: "Service Provider Phone Number",
              name: "serviceProviderPhoneNumber",
              value: formData?.serviceProviderPhoneNumber,
            },
          ].map((field) => (
            <div className="grid gap-2" key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type ?? "text"}
                value={field.value}
                placeholder={field.placeholder ?? ""}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>

        <div className="grid gap-2">
          <Label>Category</Label>
          <ComboboxItem
            options={data?.result ?? []}
            value={selected}
            onChange={(opt) => {
              setSelectedCategory(opt);
              setFormData((prev) => ({
                ...prev,
                categoryId: opt?.categoryId.toString() ?? "",
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

        <div className="p-2 grid gap-2">
          <Button type="submit" className="">
            {itemsLoading ? <LoadingSpinner /> : "Save Item"}
          </Button>
          <Button
            type="button"
            onClick={() => navigate(-1)}
            variant={"destructive"}
            className=""
          >
            Cancel
          </Button>
        </div>
      </form>
    </ScrollArea>
  );
};

export default UpdateItem;
