import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="horizontal" className="" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
