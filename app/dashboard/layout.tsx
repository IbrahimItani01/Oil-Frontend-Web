import AppSidebar from "@/components/base/AppSidebar";
import { DashboardHeader } from "@/components/base/DashboardHeader";
import NotificationsSection from "@/components/base/NotificationsSection";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className='flex w-full h-[100vh]'>
				<div className='w-full flex flex-col'>
					<DashboardHeader />

					{children}
				</div>
				<NotificationsSection />
			</div>
		</SidebarProvider>
	);
}
