import { ArrowBigRight } from "lucide-react";
import React, { useEffect } from "react";
import { Form, Link } from "react-router";
import { toast } from "sonner";
import ComboboxItem, {
  type ComboboxOption as ItemOption,
} from "~/components/comboboxItemForAssign";
import ComboboxItemUser, {
  type ComboboxOption,
} from "~/components/comboboxItemUser";
import { useToken } from "~/components/getToken";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { createAssignment } from "~/redux/features/assign/assignSlice";
import { getAllItemUser } from "~/redux/features/Item-User/itemUserSlice";
import { getAllItem } from "~/redux/features/Item/itemSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hook";

const AssignTo = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.itemUsers);
  const { data: itemData } = useAppSelector((state) => state.items);
  const {
    loading: assignLoading,
    data: assignData,
    refresh,
  } = useAppSelector((state) => state.assign);
  const token = useToken();

  const [selected, setSelected] = React.useState<ComboboxOption | null>(null);
  const [selectedUser, setSelectedUser] = React.useState<ComboboxOption[]>([]);
  const [selectedI, setSelectedI] = React.useState<ItemOption | null>(null);
  const [selectedItem, setSelectedItem] = React.useState<ItemOption[]>([]);
  const [isAttempted, setIsAttempted] = React.useState<boolean>(true);

  const [formData, setFormData] = React.useState<{
    itemUserIds: string[];
    itemIds: string[];
    assignedDate: string;
    assignTimeCondition: string;
    assignAgainstTo: string;
    status: string;
  }>({
    itemUserIds: [],
    itemIds: [],
    assignedDate: "",
    assignTimeCondition: "",
    assignAgainstTo: "",
    status: "",
  });

  useEffect(() => {
    dispatch(getAllItemUser({ token }));
    dispatch(getAllItem({ token }));
    setIsAttempted(false);
  }, [refresh]);

  useEffect(() => {
    if (isAttempted) return;
    const ShowToast = assignData?.success ? toast.success : toast.error;
    ShowToast(assignData?.statusCode ?? data?.code, {
      description: assignData?.message,
      position: "top-right",
      richColors: true,
    });
  }, [refresh]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createAssignment({ token, formPayload: formData }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl">Assign Item</h1>
        <Link to={"/dashboard/view-assign-data"}>
          <Button variant={"default"}>View Assignment Data</Button>
        </Link>
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* User selection */}
          <div className="w-full">
            <div className="flex gap-3 flex-col">
              <label>Select User</label>
              <ComboboxItemUser
                options={data?.result ?? []}
                value={selected}
                onChange={(opt) => {
                  setSelected(opt);
                  if (
                    opt &&
                    !selectedUser.some((u) => u.itemUserId === opt.itemUserId)
                  ) {
                    setSelectedUser((prev) => [...prev, opt]);
                    setFormData((prev) => ({
                      ...prev,
                      itemUserIds: [
                        ...prev.itemUserIds,
                        opt.itemUserId.toString(),
                      ],
                    }));
                  }
                }}
                placeholder="Search by Office Id"
                renderOption={(opt) => (
                  <div className="flex items-center gap-3">
                    <div className="truncate">{opt.name}</div>
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col gap-2 mt-3 w-auto">
              <label>Selected Users</label>
              <div className="flex flex-wrap gap-2 border rounded-md p-2">
                {selectedUser.length === 0 ? (
                  <span className="text-muted-foreground">
                    No users selected
                  </span>
                ) : (
                  selectedUser.map((u) => (
                    <Badge key={u.itemUserId} variant="secondary">
                      {u.name}
                    </Badge>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Item selection */}
          <div className="w-full">
            <div className="flex gap-3 flex-col">
              <label>Select Item</label>
              <ComboboxItem
                options={itemData?.result ?? []}
                value={selectedI}
                onChange={(opt) => {
                  setSelectedI(opt);
                  if (
                    opt &&
                    !selectedItem.some((u) => u.itemId === opt.itemId)
                  ) {
                    setSelectedItem((prev) => [...prev, opt]);
                    setFormData((prev) => ({
                      ...prev,
                      itemIds: [...prev.itemIds, opt.itemId.toString()],
                    }));
                  }
                }}
                placeholder="Search by item name or id"
                renderOption={(opt) => (
                  <div className="flex items-center gap-3">
                    <div className="truncate">{opt.name}</div>
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col gap-2 mt-3 w-auto">
              <label>Selected Items</label>
              <div className="flex flex-wrap gap-2 border rounded-md p-2">
                {selectedItem.length === 0 ? (
                  <span className="text-muted-foreground">
                    No item selected
                  </span>
                ) : (
                  selectedItem.map((u) => (
                    <Badge key={u.itemId} variant="secondary">
                      {u.name}
                    </Badge>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Other inputs */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="grid gap-2 p-0">
            <Label htmlFor="assignedDate">Assigning Date</Label>
            <Input
              id="assignedDate"
              type="date"
              name="assignedDate"
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2 p-0">
            <Label htmlFor="assignTimeCondition">Item Condition</Label>
            <Input
              id="assignTimeCondition"
              name="assignTimeCondition"
              placeholder="new, used"
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2 p-0">
            <Label htmlFor="assignAgainstTo">Assign Against To</Label>
            <Input
              id="assignAgainstTo"
              name="assignAgainstTo"
              placeholder="replaced item id"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2 p-0">
            <Label htmlFor="status">Status</Label>
            <Input
              id="status"
              name="status"
              placeholder="active/inactive"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <Button
            variant="default"
            className="flex items-center justify-center cursor-pointer"
            type="submit"
          >
            Assign
            <ArrowBigRight />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AssignTo;
