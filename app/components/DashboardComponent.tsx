import React, { type ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { SiteHeader } from "./site-header";

interface DashboardProps {
  children?: ReactNode;
}

const DashboardComponent: React.FC<DashboardProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="p-6 mt-10">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardComponent;
