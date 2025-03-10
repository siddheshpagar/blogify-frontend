"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({ items }) {

  // State to track the open/close status of each collapsible sidebar item
  const [openItems, setOpenItems] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const pathname = usePathname(); // use ti get current path

  // function to toggle the visibility of sub-items
  const toggleItem = (title) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));
  };

  const handleItemClick = (item) => {
    setSelectedItem(item.title);
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          // check whether the current item or its sub-item is active
          const isActive =
            pathname === item.url ||
            item.items?.some((subItem) => pathname === subItem.url);

          return (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem>
                <div className="flex items-center">
                  {/* Rectangle Block */}
                  {isActive && (
                    <div className="w-[6px] h-[40px] bg-[#d2a800] rounded-tr-[20px] rounded-br-[20px] mr-2"></div>
                  )}
                  {/* Main Sidebar Item */}
                  <CollapsibleTrigger asChild>
                    <div
                      className={`flex items-center justify-between h-[40px] w-[185px] p-2 cursor-pointer rounded-lg 
                        ${isActive
                          ? "bg-[#FFFCF2] text-[#1A1A1A]"
                          : "text-[#98989A]"
                        }`}
                      onClick={() => {
                        toggleItem(item.title);
                        handleItemClick(item);
                      }}
                    >
                      {item.url ? (
                        <Link
                          href={item.url}
                          className={"flex items-center space-x-3"}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      ) : (
                        <div className={`flex items-center space-x-3`}>
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                      )}

                      {/* Expand/Collapse Icon for items with sub-items */}
                      {item.items?.length ? (
                        <ChevronUp
                          className={`transition-transform duration-200 ${openItems[item.title] ? "rotate-180" : ""
                            }`}
                        />
                      ) : null}
                    </div>
                  </CollapsibleTrigger>
                </div>

                {/* Sub-items */}
                {item.items?.length ? (
                  <CollapsibleContent>
                    <SidebarMenuSub className="mb-[35px]">
                      {item.items.map((subItem) => {
                        const isSubItemActive = pathname === subItem.url;

                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                className={`text-[14.22px] mt-[27px] ${isSubItemActive
                                  ? "text-[#d2a800] font-normal"
                                  : "text-[#98989A]"
                                  }`}
                                href={subItem.url}
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}