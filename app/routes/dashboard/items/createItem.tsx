// import * as React from "react";
// import { Button } from "~/components/ui/button";
// import { Input } from "~/components/ui/input";
// import { Label } from "~/components/ui/label";
// import { ScrollArea } from "~/components/ui/scroll-area";
// import ComboboxItem, { type ComboboxOption } from "~/components/comboboxItem";
// import { useAppDispatch, useAppSelector } from "~/redux/hook";
// import { createItem } from "~/redux/features/Item/itemSlice";
// import { getAllCategory } from "~/redux/features/Category/categorySlice";
// import { useToken } from "~/components/getToken";
// import { useNavigate } from "react-router";
// import { ArrowLeft } from "lucide-react";
// import LoadingSpinner from "~/components/loading";

// type ItemProps = {
//   className?: string;
// };

// const CreatItem = ({ className }: ItemProps) => {
//   const [formData, setFormData] = React.useState({
//     name: "",
//     modelNumber: "",
//     serialNumber: "",
//     brandName: "",
//     price: "",
//     purchaseDate: "",
//     warrantyEnd: "",
//     sourceName: "",
//     sourcePhoneNumber: "",
//     lastServicingDate: "",
//     nextServicingDate: "",
//     serviceProviderName: "",
//     serviceProviderPhoneNumber: "",
//     quantity: "",
//     itemCondition: "",
//     categoryId: "",
//     status: "",
//   });
//   const [selectedCategory, setSelectedCategory] =
//     React.useState<ComboboxOption | null>(null);

//   const dispatch = useAppDispatch();
//   const token = useToken() as string;
//   const { data } = useAppSelector((state) => state.categories);
//   const { loading: itemsLoading, data: items } = useAppSelector(
//     (state) => state.items
//   );
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     dispatch(getAllCategory({ token }));
//   }, [dispatch, token]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formPayload = new FormData();
//     Object.entries(formData).forEach(([k, v]) =>
//       formPayload.append(k, String(v ?? ""))
//     );
//     dispatch(createItem({ token, formPayload }));
//     navigate("/dashboard/items");
//   };

//   return (
//     <ScrollArea className="w-full h-auto overflow-auto p-2">
//       <div className="p-2 mb-4">
//         <Button onClick={() => navigate(-1)} variant={"outline"} className="">
//           <ArrowLeft />
//           Go Back
//         </Button>
//       </div>
//       <form className={className} onSubmit={handleSubmit}>
//         {[
//           { label: "Name", name: "name", placeholder: "LG" },
//           {
//             label: "Model Number",
//             name: "modelNumber",
//             placeholder: "DS-K1T5",
//           },
//           {
//             label: "Serial Number",
//             name: "serialNumber",
//             placeholder: "FV12S3490",
//           },
//           { label: "Brand Name", name: "brandName", placeholder: "LG" },
//           { label: "Price", name: "price", placeholder: "10,000" },
//           { label: "Purchase Date", name: "purchaseDate", type: "date" },
//           { label: "Warranty Date", name: "warrantyEnd", type: "date" },
//           { label: "Source Name", name: "sourceName" },
//           { label: "Source Phone Number", name: "sourcePhoneNumber" },
//           {
//             label: "Last Servicing Date",
//             name: "lastServicingDate",
//             type: "date",
//           },
//           {
//             label: "Next Servicing Date",
//             name: "nextServicingDate",
//             type: "date",
//           },
//           { label: "Service Provider Name", name: "serviceProviderName" },
//           {
//             label: "Service Provider Phone Number",
//             name: "serviceProviderPhoneNumber",
//           },
//           { label: "Quantity", name: "quantity" },
//           {
//             label: "Item Condition",
//             name: "itemCondition",
//             placeholder: "good, broken",
//           },
//           { label: "Status", name: "status", placeholder: "active/inactive" },
//         ].map((field) => (
//           <div className="grid gap-2 p-2" key={field.name}>
//             <Label htmlFor={field.name}>{field.label}</Label>
//             <Input
//               id={field.name}
//               name={field.name}
//               type={field.type ?? "text"}
//               placeholder={field.placeholder ?? ""}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         ))}

//         <div className="grid gap-2 p-2">
//           <Label>Category</Label>
//           <ComboboxItem
//             options={data?.result ?? []}
//             value={selectedCategory}
//             onChange={(opt) => {
//               setSelectedCategory(opt);
//               setFormData((prev) => ({
//                 ...prev,
//                 categoryId: opt?.categoryId.toString() ?? "",
//               }));
//             }}
//             placeholder="Choose a Category"
//             renderOption={(opt, highlighted) => (
//               <div className="flex items-center gap-3">
//                 <div className="min-w-0">
//                   <div className="truncate">{opt.name}</div>
//                 </div>
//               </div>
//             )}
//           />
//         </div>

//         <div className="p-2 grid gap-2">
//           <Button type="submit" className="">
//             {itemsLoading ? <LoadingSpinner /> : "Save Item"}
//           </Button>
//           <Button
//             onClick={() => navigate(-1)}
//             variant={"destructive"}
//             className=""
//           >
//             Cancel
//           </Button>
//         </div>
//       </form>
//     </ScrollArea>
//   );
// };

// export default CreatItem;

import * as React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import ComboboxItem, { type ComboboxOption } from "~/components/comboboxItem";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { createItem } from "~/redux/features/Item/itemSlice";
import { getAllCategory } from "~/redux/features/Category/categorySlice";
import { useToken } from "~/components/getToken";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "~/components/loading";

type ItemProps = {
  className?: string;
};

const CreatItem = ({ className }: ItemProps) => {
  const [formData, setFormData] = React.useState({
    name: "",
    modelNumber: "",
    serialNumber: "",
    brandName: "",
    price: "",
    purchaseDate: "",
    warrantyEnd: "",
    sourceName: "",
    sourcePhoneNumber: "",
    lastServicingDate: "",
    nextServicingDate: "",
    serviceProviderName: "",
    serviceProviderPhoneNumber: "",
    quantity: "",
    itemCondition: "",
    categoryId: "",
    status: "",
  });
  const [selectedCategory, setSelectedCategory] =
    React.useState<ComboboxOption | null>(null);

  const dispatch = useAppDispatch();
  const token = useToken() as string;
  const { data } = useAppSelector((state) => state.categories);
  const { loading: itemsLoading } = useAppSelector((state) => state.items);
  const navigate = useNavigate();

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
    dispatch(createItem({ token, formPayload }));
    navigate("/dashboard/items");
  };

  return (
    <ScrollArea className="w-full h-full">
      {/* Back Button */}
      <div className="mb-4">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Button>
      </div>

      {/* Form */}
      <form
        className={`w-full max-w-full sm:max-w-2xl mx-auto space-y-4 ${
          className ?? ""
        }`}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Name", name: "name", placeholder: "LG" },
            {
              label: "Model Number",
              name: "modelNumber",
              placeholder: "DS-K1T5",
            },
            {
              label: "Serial Number",
              name: "serialNumber",
              placeholder: "FV12S3490",
            },
            { label: "Brand Name", name: "brandName", placeholder: "LG" },
            { label: "Price", name: "price", placeholder: "10,000" },
            { label: "Purchase Date", name: "purchaseDate", type: "date" },
            { label: "Warranty Date", name: "warrantyEnd", type: "date" },
            { label: "Source Name", name: "sourceName" },
            { label: "Source Phone Number", name: "sourcePhoneNumber" },
            {
              label: "Last Servicing Date",
              name: "lastServicingDate",
              type: "date",
            },
            {
              label: "Next Servicing Date",
              name: "nextServicingDate",
              type: "date",
            },
            { label: "Service Provider Name", name: "serviceProviderName" },
            {
              label: "Service Provider Phone Number",
              name: "serviceProviderPhoneNumber",
            },
            { label: "Quantity", name: "quantity" },
            {
              label: "Item Condition",
              name: "itemCondition",
              placeholder: "good, broken",
            },
            { label: "Status", name: "status", placeholder: "active/inactive" },
          ].map((field) => (
            <div className="flex flex-col gap-1 min-w-0" key={field.name}>
              <Label htmlFor={field.name} className="text-sm font-medium">
                {field.label}
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type ?? "text"}
                placeholder={field.placeholder ?? ""}
                onChange={handleChange}
                required
                className=""
              />
            </div>
          ))}
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1 min-w-0">
          <Label className="text-sm font-medium">Category</Label>
          <ComboboxItem
            options={data?.result ?? []}
            value={selectedCategory}
            onChange={(opt) => {
              setSelectedCategory(opt);
              setFormData((prev) => ({
                ...prev,
                categoryId: opt?.categoryId.toString() ?? "",
              }));
            }}
            placeholder="Choose a Category"
            renderOption={(opt) => (
              <div className="flex items-center gap-3">
                <div className="truncate">{opt.name}</div>
              </div>
            )}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button type="submit" className="w-full sm:w-auto">
            {itemsLoading ? <LoadingSpinner /> : "Save Item"}
          </Button>
          <Button
            type="button"
            onClick={() => navigate(-1)}
            variant="destructive"
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
        </div>
      </form>
    </ScrollArea>
  );
};

export default CreatItem;
