import type { Tool } from "@/components/app-sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/theme-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Loader from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Home from "@/pages/home/Home";
import { useCallback, useEffect, useState } from "react";

export default function Layout() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(false);
  const [pendingTool, setPendingTool] = useState<Tool | null>(null);

  const handleSelectTool = useCallback(
    (tool: Tool | null) => {
      if (tool === selectedTool) return;
      setLoading(true);
      setPendingTool(tool ?? null);
    },
    [selectedTool]
  );

  useEffect(() => {
    if (!loading) return;
    const timeout = setTimeout(() => {
      setSelectedTool(pendingTool);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [loading, pendingTool]);

  return (
    <SidebarProvider>
      <AppSidebar selectedTool={selectedTool} onSelectTool={handleSelectTool} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 flex-1">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dev Tool Chest</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{selectedTool ? selectedTool.name : "Home"}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex-1" />
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex flex-1 items-center justify-center border-1 rounded-md">
            {loading ? (
              <Loader />
            ) : selectedTool ? (
              <iframe src={selectedTool.url} title={selectedTool.name} className="w-full h-full rounded-md" />
            ) : (
              <Home />
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
