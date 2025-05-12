import { DashboardSidebar } from '@/components/dashboard-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <div className="w-fit flex items-center gap-2 px-4 my-4">
          <SidebarTrigger className="-ml-1" />
        </div>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
