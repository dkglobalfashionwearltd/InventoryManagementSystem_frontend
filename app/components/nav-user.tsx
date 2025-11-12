// import { BellIcon, LogOutIcon, UserCircleIcon } from "lucide-react";
// import { useEffect } from "react";

// import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "~/components/ui/dropdown-menu";
// import {
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "~/components/ui/sidebar";
// import { getUser } from "~/redux/features/auth/userSlice";
// import { clearToken } from "~/redux/features/auth/authSlice";
// import { useAppDispatch, useAppSelector } from "~/redux/hook";
// import { useToken, useUserId } from "./getToken";
// import LoadingSpinner from "./loading";
// import { useNavigate } from "react-router";
// import { logoutUser, refreshToken } from "~/redux/features/auth/authSliceNew";

// export function NavUser() {
//   const { isMobile } = useSidebar();
//   const dispatch = useAppDispatch();
//   const token = useToken() as string;
//   const navigate = useNavigate();
//   const { loading, data } = useAppSelector((state) => state.user);
//   const {
//     isAuthenticated,
//     loading: newLo,
//     userId,
//     role,
//   } = useAppSelector((state) => state.loginNew);
//   console.log("ggggg", userId, role);

//   useEffect(() => {
//     dispatch(refreshToken({ baseUrl: "https://localhost:7189" })).finally(() =>
//       console.log("Success")
//     );
//   }, [dispatch]);

//   useEffect(() => {
//     if (!userId || !isAuthenticated) return;
//     dispatch(getUser({ userId: userId, token }));
//   }, [userId]);

//   const handleLogout = () => {
//     // dispatch(clearToken());
//     // window.location.reload();
//     dispatch(logoutUser({ baseUrl: "https://localhost:7189" }));
//   };

//   if (loading) {
//     // still checking (localStorage, cookie, etc.)
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <SidebarMenuButton
//               size="lg"
//               className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
//             >
//               <Avatar className="h-8 w-8 rounded-lg grayscale">
//                 <AvatarImage src={""} alt={data?.result?.userName} />
//                 <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//               </Avatar>
//               <div className="grid flex-1 text-left text-sm leading-tight">
//                 <span className="truncate font-medium">
//                   {data?.result?.userName}
//                 </span>
//                 <span className="truncate text-xs text-muted-foreground">
//                   {data?.result?.email}
//                 </span>
//               </div>
//               {/* <MoreVerticalIcon className="ml-auto size-4" /> */}
//             </SidebarMenuButton>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
//             side={isMobile ? "bottom" : "right"}
//             align="end"
//             sideOffset={4}
//           >
//             <DropdownMenuLabel className="p-0 font-normal">
//               <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//                 <Avatar className="h-8 w-8 rounded-lg">
//                   <AvatarImage src={""} alt={data?.result?.userName} />
//                   <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//                 </Avatar>
//                 <div className="grid flex-1 text-left text-sm leading-tight">
//                   <span className="truncate font-medium">
//                     {data?.result?.userName}
//                   </span>
//                   <span className="truncate text-xs text-muted-foreground">
//                     {data?.result?.email}
//                   </span>
//                 </div>
//               </div>
//             </DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuGroup>
//               <DropdownMenuItem onClick={() => navigate("/dashboard/users")}>
//                 <UserCircleIcon />
//                 Account
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <BellIcon />
//                 Notifications
//               </DropdownMenuItem>
//             </DropdownMenuGroup>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem onClick={handleLogout}>
//               <LogOutIcon />
//               Log out
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   );
// }

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { getUser } from "~/redux/features/auth/userSlice";
import { logoutUser, refreshToken } from "~/redux/features/auth/authSliceNew";
import { useNavigate } from "react-router";
import LoadingSpinner from "./loading";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { BellIcon, LogOutIcon, UserCircleIcon } from "lucide-react";
import { useUserId } from "./getToken";

export function NavUser() {
  const { isMobile } = useSidebar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = useUserId();

  const { loading: userLoading, data } = useAppSelector((state) => state.user);

  // Fetch user data once we have userId
  useEffect(() => {
    if (userId) {
      dispatch(getUser({ userId, token: "" }));
    }
  }, [userId, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser({ baseUrl: "https://localhost:7189" }));
    window.location.reload();
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src="" alt={data?.result?.userName} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {data?.result?.userName}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {data?.result?.email}
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="" alt={data?.result?.userName} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {data?.result?.userName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {data?.result?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate("/dashboard/users")}>
                <UserCircleIcon />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
