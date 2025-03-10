"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({ user, logoutAction }) {
  const { isMobile } = useSidebar()

  return (
    (<SidebarMenu >
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="bg-[#FFD11A] hover:bg-[#FFD11A]"
            >
              {/* User image */}
              <Avatar className="h-8 w-8 rounded-full overflow-hidden">
                <AvatarImage
                  src="https://img.freepik.com/free-photo/cheerful-dark-skinned-woman-smiling-broadly-rejoicing-her-victory-competition-young-writers-standing-isolated-against-grey-wall-people-success-youth-happiness-concept_273609-1246.jpg"
                  alt={user.name}
                  className="h-12 w-12 object-cover object-center scale-125"
                />
                <AvatarFallback className="rounded-lg">img</AvatarFallback>
              </Avatar>

              {/* user info name and email */}
              <div className="grid flex-1 text-left leading-tight text-[#1A1A1A]">
                <span className="truncate text-[12.64px] font-normal ">
                  {user.name}
                </span>
                <span className="truncate text-[10px] font-normal">
                  {user.email}
                </span>
              </div>

              {/* dropdown Icon */}
              <ChevronsUpDown className="ml-auto text-[#1A1A1A] size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* dropdown menu content */}
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* user info in dropdown */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full overflow-hidden">
                  <AvatarImage
                    src="https://img.freepik.com/free-photo/cheerful-dark-skinned-woman-smiling-broadly-rejoicing-her-victory-competition-young-writers-standing-isolated-against-grey-wall-people-success-youth-happiness-concept_273609-1246.jpg"
                    alt={user.name}
                    className="h-12 w-12 object-cover object-center "
                  />
                  <AvatarFallback className="rounded-lg">you</AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            {/* border line */}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logoutAction}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>)
  );
}
