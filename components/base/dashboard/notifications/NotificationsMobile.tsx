"use client";
import { notifications } from "@/lib/constants/notifications.constants";
import React, { useState, useEffect } from "react";
import { NotificationCard } from "./NotificationCard";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const NotificationsMobile = () => {
	const [open, setOpen] = useState(false);

	// Close dropdown if screen width becomes desktop (md: 768px)
	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 768px)");

		const handleResize = () => {
			if (mediaQuery.matches) {
				setOpen(false);
			}
		};

		// Listen for changes
		mediaQuery.addEventListener("change", handleResize);

		// Cleanup listener on unmount
		return () => mediaQuery.removeEventListener("change", handleResize);
	}, []);

	return (
		<div className='md:hidden absolute top-3 right-2 z-50'>
			<Popover
				open={open}
				onOpenChange={setOpen}
			>
				<PopoverTrigger asChild>
					<Button
						variant='ghost'
						size='icon'
						className='relative h-10 w-10'
						aria-label='Open notifications'
					>
						<Bell
							size={30}
							className='h-5 w-5'
						/>
						{notifications.length > 0 && (
							<span className='absolute right-2 top-2 h-2 w-2 rounded-full bg-primary' />
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className='w-80 p-0 md:hidden'
					align='end'
				>
					<div className='border-b p-4'>
						<h2 className='text-lg font-semibold'>Notifications</h2>
					</div>
					<div className='max-h-96 overflow-y-auto'>
						{notifications.map((notification) => (
							<NotificationCard
								key={notification.id}
								notification={notification}
							/>
						))}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default NotificationsMobile;
