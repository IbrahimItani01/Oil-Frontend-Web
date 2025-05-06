"use client";
import { useAppSelector } from "@/store/store"; // Import the selector
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface LoaderProps {
	/**
	 * Optional text to display below the spinner
	 */
	text?: string;
	/**
	 * Optional className for custom styling
	 */
	className?: string;
}

const Loader = ({ text, className }: LoaderProps) => {
	const isLoading = useAppSelector((state) => state.app.loaderOn);
	const pathname = usePathname();

	if (!isLoading || pathname === "/") return null;
    console.log("toz")
	return (
		<div
			className={cn(
				"fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm",
				className
			)}
		>
			<Loader2 className='h-10 w-10 animate-spin text-primary' />
			{text && <p className='mt-4 text-sm text-muted-foreground'>{text}</p>}
		</div>
	);
};

export default Loader;
