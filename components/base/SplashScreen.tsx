"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../public/logo.png";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const SplashScreen = () => {
	const [progress, setProgress] = useState(0);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					// Start fade out animation after short delay
					setTimeout(() => setVisible(false), 500);
					return 100;
				}
				return prev + 1; // Smaller increments for smoother transition
			});
		}, 30); // Faster interval (30ms)

		return () => clearInterval(interval);
	}, []);

	if (!visible) return null;

	return (
		<div className='fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 z-50'>
			<div
				className={cn(
					"flex flex-col items-center justify-center gap-8",
					"animate-in fade-in duration-1000 slide-in-from-bottom-4"
				)}
			>
				<div className='relative w-32 h-32 md:w-40 md:h-40 animate-pulse'>
					<Image
						src={Logo || "/placeholder.svg"}
						alt='Logo'
						fill
						className='object-contain drop-shadow-md'
						priority
					/>
				</div>

				<div className='w-64 md:w-80 flex justify-center'>
					<Loader2 className='animate-spin' />
				</div>

				<p className='text-sm text-slate-500 dark:text-slate-400 animate-pulse'>
					Loading your experience...
				</p>
			</div>
		</div>
	);
};

export default SplashScreen;
