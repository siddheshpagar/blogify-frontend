"use client"

import * as React from "react"
import {
  SquareUser,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import { useAdminStore } from "@/store/adminStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const data = {
  navMain: [
    {
      title: "all Users",
      url: "/admin/dashboard/users",
      icon: SquareUser,
    },
  ],
}

export function AppSidebar({
  ...props
}) {

  const { admin, fetchAdmin, logoutAdmin } = useAdminStore();
  const router = useRouter();

  useEffect(() => {
    fetchAdmin();
  }, [])

  return (
    <Sidebar  {...props}  /*collapsible="icon" side="right" variant="floating"*/>

      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="mt-[50px] mb-[64px] " size="xl" asChild>
              <Link href="#">
                <Image src="/logo.png" width={40} height={40} alt={`${process.env.NEXT_PUBLIC_APP_NAME} Logo`} />
                <span className="ml-[7px] truncate text-lg lg:text-xl font-bold text-white">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter className="">
        {admin ? (
          <NavUser user={admin} logoutAction={() => logoutAdmin(router)} />
        ) : (
          <div className="flex items-center animate-spin rounded-full h-12 w-12">
            <Image src="/loading.png" width={48} height={48} alt="Loading..." />
          </div>
        )}
      </SidebarFooter>

    </Sidebar>
  );
}
