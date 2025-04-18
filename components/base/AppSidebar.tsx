import React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarSeparator,
} from "@/components/ui/sidebar";
import UserProfileHeader from "./sidebar/UserProfileHeader";
import Footer from "./sidebar/Footer";
import SidebarItems from "./sidebar/SidebarItems";

const AppSidebar = () => {
	return (
		<Sidebar
			collapsible='icon'
			variant='floating'
		>
			<SidebarHeader className='mb-7'>
				<UserProfileHeader />
			</SidebarHeader>
			{/* Content */}
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarItems />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* Footer */}
			<SidebarFooter>
				<Footer />
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidebar;
