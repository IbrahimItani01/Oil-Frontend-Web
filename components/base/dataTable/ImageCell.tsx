"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { usePathname } from "next/navigation";

const ImageCell = ({ src, isAvatar }: { src: string; isAvatar: boolean }) => {
	const pathname = usePathname();

	if (isAvatar && pathname.includes("appointments")) {
		return (
			<Avatar className='h-8 w-8'>
				<AvatarImage
					src={src}
					alt='Avatar'
				/>
				<AvatarFallback>UN</AvatarFallback>
			</Avatar>
		);
	}

	return (
		<div className='h-8 w-8 relative'>
			<Image
				src={src || "/placeholder.svg"}
				alt='Product'
				fill
				className='object-cover rounded-md'
			/>
		</div>
	);
};
export default ImageCell;
