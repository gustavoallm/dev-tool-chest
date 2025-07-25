import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { Code2, FileDiff, SquareTerminal } from "lucide-react";
import * as React from "react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// Microfrontend tools definition
export type Tool = {
  name: string;
  icon: React.ElementType;
  url: string;
};

const defaultTools: Tool[] = [
  {
    name: "Markdown Previewer",
    icon: SquareTerminal,
    url: "https://stakem-markdown-previewer.netlify.app/",
  },
  {
    name: "JSON Parser",
    icon: Code2,
    url: "https://stakem-json-parser.netlify.app/",
  },
  {
    name: "File Diff Viewer",
    icon: FileDiff,
    url: "https://stakem-file-diff-viewer.netlify.app",
  },
];

export function AppSidebar({
  tools = defaultTools,
  onSelectTool,
  selectedTool,
  ...props
}: {
  tools?: Tool[];
  onSelectTool?: (tool: Tool | null) => void;
  selectedTool?: Tool | null;
} & React.ComponentProps<typeof Sidebar>) {
  const sidebar = useSidebar();
  return (
    <Sidebar collapsible="icon" className="group" {...props}>
      <SidebarHeader className="px-2 pt-3 pb-1">
        <SidebarMenuButton
          tooltip={sidebar.state === "collapsed" ? "Expand sidebar" : undefined}
          onClick={sidebar.toggleSidebar}
          className="mb-1"
        >
          <SquareTerminal className="w-7 h-7 text-primary" />
          <span className="text-lg font-bold">Dev Tool Chest</span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {/* Home item */}
            <SidebarMenuItem key="Home">
              <SidebarMenuButton
                tooltip="Home"
                className={selectedTool == null ? "bg-muted" : ""}
                onClick={() => onSelectTool?.(null)}
              >
                <SquareTerminal />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {/* Tools */}
            {tools.map((tool) => (
              <SidebarMenuItem key={tool.name}>
                <SidebarMenuButton
                  tooltip={tool.name}
                  className={selectedTool?.name === tool.name ? "bg-muted" : ""}
                  onClick={() => onSelectTool?.(tool)}
                >
                  <tool.icon />
                  <span>{tool.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: "Guest", email: "guest@example.com", avatar: "/avatars/guest.jpg" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
