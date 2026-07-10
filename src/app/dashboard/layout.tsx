"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/app-sidebar";
import { Topbar } from "@/components/layouts/topbar";

import { FluidBackground } from "@/components/FluidBackground";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <FluidBackground intensity="low" />
      <div className="flex min-h-screen w-full bg-background/50 selection:bg-primary/20 selection:text-primary relative z-10">
        <AppSidebar />
        <div className="flex w-full flex-col flex-1 overflow-hidden relative">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            <div className="max-w-[1280px] mx-auto w-full h-full animate-in fade-in zoom-in-95 duration-300">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
