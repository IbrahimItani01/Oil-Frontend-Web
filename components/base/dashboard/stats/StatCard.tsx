import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface StatCardProps {
	title: string;
	value: string;
	change: number;
	className?: string;
}

const StatCard = ({ title, value, change, className }: StatCardProps) => {
	const isPositive = change > 0;

	return (
		<Card className={cn("flex-shrink-0", className)}>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium'>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='text-2xl font-bold'>{value}</div>
				<div className='flex items-center text-xs text-muted-foreground'>
					{isPositive ? (
						<ArrowUpIcon className='h-4 w-4 text-green-500' />
					) : (
						<ArrowDownIcon className='h-4 w-4 text-red-500' />
					)}
					<span
						className={cn(
							"ml-1",
							isPositive ? "text-green-500" : "text-red-500"
						)}
					>
						{Math.abs(change)}%
					</span>
				</div>
			</CardContent>
		</Card>
	);
};

export default StatCard;
