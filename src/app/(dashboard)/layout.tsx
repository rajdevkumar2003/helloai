import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/modules/dashboard/views/dashboard-navbar";
import DashboardSidebar from "@/modules/dashboard/views/dashboard-sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar/>
      <main className="flex flex-col h-screen w-screen bg-muted">
        {/* <SidebarTrigger/> */}
        <DashboardNavbar/>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
