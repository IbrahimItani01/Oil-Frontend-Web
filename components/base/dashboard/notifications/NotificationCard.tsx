import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Notification {
	id: string;
	avatar: string;
	name: string;
	action: "booked" | "canceled";
	timestamp: string;
}

export function NotificationCard({
	notification,
}: {
	notification: Notification;
}) {
	return (
		<div className='flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-accent'>
			<Avatar>
				<AvatarImage
					src={notification.avatar}
					alt={notification.name}
				/>
				<AvatarFallback>{notification.name[0]}</AvatarFallback>
			</Avatar>
			<div className='flex flex-col gap-1'>
				<p className='text-sm'>
					<span className='font-medium'>{notification.name}</span>{" "}
					{notification.action === "booked" ? "booked" : "canceled"} their
					appointment
				</p>
				<p className='text-sm text-muted-foreground'>
					{notification.timestamp}
				</p>
			</div>
		</div>
	);
}
