"use client"

import * as React from "react"
import {
  SquareUser,
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  FileText,
  House,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
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
import { useUserStore } from "@/store/userStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// navigation data for sidebar links
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://s3-alpha-sig.figma.com/img/7ae5/4b04/7cabfc389ad01185b8d32e9e77e92cb4?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cFLJN9T8IKC-FGM7Gxu4QmLo05zgeNMY0ncVCJP0oBVbQfMlP61R16EdOeupJJ5pucrcUQvOVpED~nICgtdHAgwqxZfbrUKP7qUz1dJ0PBQpksj7dGJPjEez2JS2By90hjlSMhupQLemWvFIM1zLdHD7lYKfttHSfmmi15pa8jffIjuPIt68gMvoFv-4wO1ixKBXXgJogB9A5VP9vTpcQlV3W2DHSgm19OV4bkiKp~Ch9U4Iqu5HwOYtWfRwDusXYfQt~ZvMKQyx45hxICvZ1UfiFUUw6dc7QxKQB4uHVCbX2bJzz3jba3Z9dGIsfaEsJsxEaV7EP0WYURCfDGZBdQ__",
  },
  navMain: [
    {
      title: "Blog",
      // url: "#",
      icon: FileText,
      isActive: true,
      items: [
        {
          title: "Create Blog",
          url: "/user/dashboard/createblog",
        },
        {
          title: "List Blog",
          url: "/user/dashboard/listblog",
        },
      ],
    },
    {
      title: "Home",
      url: "/",
      icon: House,

    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {


  const { user, fetchUser, logoutUser } = useUserStore();
  const router = useRouter();

  // Fetches user details
  useEffect(() => {
    fetchUser();
  }, [])


  return (
    <Sidebar  {...props}  /*collapsible="icon" side="right" variant="floating"*/>
      {/* Sidebar header with brand logo */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="mt-[50px] mb-[64px] " size="xl" asChild>
              <Link href="#">
                <Image src="/logo.png" width={40} height={40} alt="FutureTech Logo" />
                {/* <div
                  className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div> */}
                {/* <div className="grid flex-1 text-left text-sm leading-tight"> */}
                <span className="ml-[7px] truncate text-lg lg:text-xl font-bold text-white">FutureTech</span>
                {/* <span className="truncate text-xs">Enterprise</span> */}
                {/* </div> */}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Sidebar navigation Links */}
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>

      {/* Sidebar footer to display user profile photo and log-out button */}
      <SidebarFooter className="">
        {user ? (
          <NavUser user={user} logoutAction={() => logoutUser(router)} />
        ) : (
          // loading symbol till we get user data from backend
          <div className="flex items-center animate-spin rounded-full h-12 w-12">
            <Image src="/loading.png" width={48} height={48} alt="Loading..." />
          </div>
        )}
      </SidebarFooter>

    </Sidebar>
  );
}
