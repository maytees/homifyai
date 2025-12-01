"use client";

import { Home, Library, Settings } from "lucide-react";
import type * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Library",
      url: "/dashboard/library",
      icon: Library,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
  navSecondary: [
    // {
    //   title: "Support",
    //   url: "#",
    //   icon: LifeBuoy,
    // },
    // {
    //   title: "Feedback",
    //   url: "#",
    //   icon: Send,
    // },
    // {
    //   title: "Changelog",
    //   url: "#",
    //   icon: FileText,
    // },
    // {
    //   title: "Uptime",
    //   url: "#",
    //   icon: Activity,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
