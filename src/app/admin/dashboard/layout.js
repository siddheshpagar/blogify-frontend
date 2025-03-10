import { AppSidebar } from '@/components/admin-app-sidebar'
import SearchBox from '@/components/SearchBox'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

const layout = ({ children }) => {
  return (
    <SidebarProvider>
      {/* Sidebar for navigation */}
      <AppSidebar className="text-black" />

      <main>
        <div className='ml-[16px] mt-[5px] lg:mt-[10px] lg:ml-[29px]  flex flex-row items-center gap-3'>
          <div className='md:hidden'>
            {/* Sidebar trigger */}
            <SidebarTrigger />
          </div>
        </div>

        {/* Main content section where child components will be rendered */}
        {children}

        <Toaster />
      </main>
    </SidebarProvider>
  )
}

export default layout