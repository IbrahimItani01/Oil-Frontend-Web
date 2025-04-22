"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Appointment } from "@/lib/content/appointments.content";
import { Calendar, Clock, User, UserCircle, MapPin } from "lucide-react";
import Image from "next/image";
import { statusStyles } from "./AppointmentStatusCell";

interface AppointmentDetailsModalProps {
	appointment: Appointment | null;
	isOpen: boolean;
	onClose: () => void;
}

const AppointmentDetails = ({
	appointment,
	isOpen,
	onClose,
}: AppointmentDetailsModalProps) => {
	if (!appointment) return null;
	const styles = statusStyles[appointment.status];
	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}
		>
			<DialogContent className='sm:max-w-[650px] [&>button]:text-white rounded-sm p-0 overflow-hidden [&>button]:cursor-pointer border-0 shadow-2xl max-h-[90vh] overflow-y-auto'>
				{/* Header */}
				<div className='bg-black p-6 text-white'>
					<DialogHeader>
						<DialogTitle className='text-2xl font-light tracking-tight'>
							<span className='font-bold'>{appointment.id}</span> Details
						</DialogTitle>
					</DialogHeader>
				</div>

				{/* Content */}
				<div className='p-0'>
					{/* Car Section */}
					<div className='relative h-48 w-full bg-gray-100'>
						<Image
							src={appointment.carPhoto || "/placeholder.svg"}
							alt={appointment.carModel || "Car"}
							fill
							className='object-cover'
						/>
						<div className='absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-white'>
							<div className='flex justify-between items-center'>
								<div>
									<h3 className='text-xs uppercase tracking-wider opacity-70'>
										Car ID
									</h3>
									<p className='text-lg font-bold'>{appointment.carId}</p>
								</div>
								{appointment.carModel && (
									<div>
										<h3 className='text-xs uppercase tracking-wider opacity-70'>
											Model
										</h3>
										<p className='text-lg font-bold'>{appointment.carModel}</p>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Main Info Grid */}
					<div className='grid grid-cols-2 gap-px bg-gray-200'>
						{/* Employee */}
						<div className='bg-white p-6'>
							<div className='flex items-start space-x-3'>
								<div className='w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0'>
									<UserCircle className='w-5 h-5 text-white' />
								</div>
								<div>
									<h3 className='text-xs uppercase tracking-wider text-gray-500 mb-1'>
										Employee
									</h3>
									<p className='text-lg font-bold'>
										{appointment.employeeName}
									</p>
								</div>
							</div>
						</div>

						{/* User */}
						<div className='bg-white p-6'>
							<div className='flex items-start space-x-3'>
								<div className='w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0'>
									<User className='w-5 h-5 text-white' />
								</div>
								<div>
									<h3 className='text-xs uppercase tracking-wider text-gray-500 mb-1'>
										User
									</h3>
									<p className='text-lg font-bold'>{appointment.userName}</p>
								</div>
							</div>
						</div>

						{/* Date */}
						<div className='bg-white p-6'>
							<div className='flex items-start space-x-3'>
								<div className='w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0'>
									<Calendar className='w-5 h-5 text-white' />
								</div>
								<div>
									<h3 className='text-xs uppercase tracking-wider text-gray-500 mb-1'>
										Date
									</h3>
									<p className='text-lg font-bold'>{appointment.date}</p>
								</div>
							</div>
						</div>

						{/* Time */}
						<div className='bg-white p-6'>
							<div className='flex items-start space-x-3'>
								<div className='w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0'>
									<Clock className='w-5 h-5 text-white' />
								</div>
								<div>
									<h3 className='text-xs uppercase tracking-wider text-gray-500 mb-1'>
										Time
									</h3>
									<p className='text-lg font-bold'>{appointment.time}</p>
								</div>
							</div>
						</div>
					</div>

					{/* Address Section */}
					<div className='p-6 bg-white border-t border-gray-200'>
						<div className='flex items-start space-x-3'>
							<div className='w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0'>
								<MapPin className='w-5 h-5 text-white' />
							</div>
							<div>
								<h3 className='text-xs uppercase tracking-wider text-gray-500 mb-1'>
									Address
								</h3>
								<p className='text-lg font-bold'>{appointment.address}</p>
							</div>
						</div>
					</div>

					{/* Footer */}
					<div className='flex justify-between items-center p-6 bg-gray-50 border-t border-gray-200'>
						<div>
							<h3 className='text-xs uppercase tracking-wider text-gray-500 mb-1'>
								Price
							</h3>
							<p className='text-2xl font-bold'>
								${appointment.cost.toFixed(2)}
							</p>
						</div>
						<div>
							<h3 className='text-xs uppercase tracking-wider text-gray-500 mb-1'>
								Status
							</h3>
							<div className='flex items-center gap-2'>
								<span className={`h-3 w-3 rounded-full ${styles.dot}`}></span>
								<span className={`text-lg font-bold ${styles.text}`}>
									{appointment.status}
								</span>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AppointmentDetails;
