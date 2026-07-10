"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Bot, 
  LineChart, 
  Search, 
  Map, 
  Component, 
  Database, 
  Terminal, 
  LayoutTemplate, 
  Briefcase, 
  Megaphone, 
  Settings,
  Rocket
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    title: "Intelligence",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "AI Executive Board", url: "/dashboard/executive-board", icon: Bot },
      { title: "Market Research", url: "/dashboard/market-research", icon: Search },
      { title: "Competitor Intelligence", url: "/dashboard/competitors", icon: LineChart },
    ],
  },
  {
    title: "Strategy",
    items: [
      { title: "Business Plan", url: "/dashboard/business-plan", icon: Briefcase },
      { title: "Roadmap", url: "/dashboard/roadmap", icon: Map },
      { title: "Investor Room", url: "/dashboard/investor-room", icon: Rocket },
      { title: "Marketing Studio", url: "/dashboard/marketing", icon: Megaphone },
    ],
  },
  {
    title: "Engineering",
    items: [
      { title: "Architecture", url: "/dashboard/architecture", icon: Component },
      { title: "Database Designer", url: "/dashboard/database", icon: Database },
      { title: "API Studio", url: "/dashboard/api", icon: Terminal },
      { title: "Wireframe Generator", url: "/dashboard/wireframes", icon: LayoutTemplate },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-white/5 bg-background">
      <SidebarHeader className="h-16 flex items-center justify-center border-b border-white/5 px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity w-full">
          <div className="size-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <Rocket className="size-4 text-white" />
          </div>
          <span className="text-foreground">BuildPilot X</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4 gap-6 custom-scrollbar">
        {navigation.map((group) => (
          <SidebarGroup key={group.title} className="px-2">
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      render={<Link href={item.url} />}
                      isActive={pathname === item.url}
                      className="rounded-md transition-all duration-200 hover:bg-white/5 data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-white/5 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              render={<Link href="/dashboard/settings" />}
              isActive={pathname === "/dashboard/settings"}
            >
              <Settings className="size-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
