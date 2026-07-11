"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/app/(auth)/actions";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/5 bg-background/80 backdrop-blur-xl px-4 lg:px-8">
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
        
        <div className="hidden md:flex relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input 
            placeholder="Search projects, documents, and intelligence..." 
            className="w-full pl-10 bg-white/5 border-white/10 focus-visible:ring-primary focus-visible:border-primary transition-all rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
          <Bell className="size-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" size="icon" className="rounded-full bg-white/5 border border-white/10 overflow-hidden">
              <User className="size-5 text-foreground" />
            </Button>
          } />
          <DropdownMenuContent align="end" className="w-56 glass-modal">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="focus:bg-white/10 cursor-pointer" render={<Link href="/dashboard/settings" />}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/10 cursor-pointer" render={<Link href="/dashboard/settings" />}>
                Workspace Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-white/10" />
            <form action={logout}>
              <DropdownMenuItem 
                render={<button type="submit" />}
                className="focus:bg-white/10 cursor-pointer text-destructive focus:text-destructive w-full"
              >
                Log out
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
