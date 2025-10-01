import { ArrowLeft } from "lucide-react";
import * as React from "react";
import { useNavigate } from "react-router";
import { useToken } from "~/components/getToken";
import LoadingSpinner from "~/components/loading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getAllAssignment } from "~/redux/features/assign/assignSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hook";

// ✅ Strongly typed Item and User
type Item = {
  itemId: number;
  name: string;
  categoryName: string;
  assignedDate: string;
  assignTimeCondition: string;
  assignAgainstTo: number;
  status: string;
};

type User = {
  itemUserId: number;
  officeId: number;
  name: string;
  departmentName: string;
  designation: string;
  items: Item[];
};

type ApiResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  result: User[];
};

export default function UserItemViewer() {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = React.useState("");
  const token = useToken() as string;
  const navigation = useNavigate();
  const { loading, data } = useAppSelector((state) => state.assign);

  React.useEffect(() => {
    dispatch(getAllAssignment({ token }));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  if (!data?.success) {
    return <p className="text-red-500">Failed to load data</p>;
  }

  // Filter users by search term
  const filteredUsers = data?.result?.filter(
    (user) =>
      user?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      user?.officeId
        ?.toString()
        .toLowerCase()
        .includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Button onClick={() => navigation(-1)}>
        <ArrowLeft />
        Back
      </Button>
      <h2 className="text-xl font-bold">Assigned Items</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search users by name or id..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <Accordion type="single" collapsible className="w-full">
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((user) => (
            <AccordionItem
              key={user?.itemUserId}
              value={`user-${user?.itemUserId}`}
            >
              <AccordionTrigger>
                <div className="flex flex-col text-left">
                  <span className="font-medium">{user?.name}</span>
                  <span className="text-xs text-gray-500">
                    {user?.designation} •• Office Id - {user?.officeId}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Card className="mt-2">
                  <CardHeader>
                    <CardTitle className="text-base">Assigned Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {user?.items?.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Assigned Date</TableHead>
                            <TableHead>Time Condition</TableHead>
                            <TableHead>Against To</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {user?.items?.map((item) => (
                            <TableRow key={item?.itemId}>
                              <TableCell>{item?.itemId}</TableCell>
                              <TableCell>{item?.name}</TableCell>
                              <TableCell>{item?.categoryName}</TableCell>
                              <TableCell>{item?.assignedDate}</TableCell>
                              <TableCell>{item?.assignTimeCondition}</TableCell>
                              <TableCell>{item?.assignAgainstTo}</TableCell>
                              <TableCell className="capitalize">
                                {item?.status}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-sm text-gray-500">No items assigned</p>
                    )}
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <p className="text-gray-500 mt-4">No users found.</p>
        )}
      </Accordion>
    </div>
  );
}
