import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/modules/dashboard/views/dashboard-sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar/>
      <main className="flex flex-col h-screen w-screen bg-muted">
        <SidebarTrigger/>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
