import { notifications } from "@/lib/constants/notifications.constants";
import React from "react";
import { NotificationCard } from "./NotificationCard";

const NotificationsDesktop = () => {
	return (
		<div className='hidden md:block h-screen w-[25%] max-w-[500px]'>
			<div className='rounded-lg border bg-card text-card-foreground shadow-sm h-full'>
				<div className='border-b p-4'>
					<h2 className='text-lg font-semibold'>Notifications</h2>
				</div>
				<div className='divide-y'>
					{notifications.map((notification) => (
						<NotificationCard
							key={notification.id}
							notification={notification}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default NotificationsDesktop;
