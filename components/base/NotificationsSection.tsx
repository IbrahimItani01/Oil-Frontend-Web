"use client";
import NotificationsDesktop from "./dashboard/notifications/NotificationsDesktop";
import NotificationsMobile from "./dashboard/notifications/NotificationsMobile";
import { usePathname } from "next/navigation";

const NotificationsSection = () => {
	const pathname = usePathname();

	if (pathname !== "/dashboard") return null;
	return (
		<>
			{/* Mobile View */}
			<NotificationsMobile />
			{/* Desktop View */}
			<NotificationsDesktop />
		</>
	);
};

export default NotificationsSection;
