import React from "react";
import StatCard from "./dashboard/stats/StatCard";
import { SalesChart } from "./dashboard/stats/SalesChart";
import { ProductsTable } from "./dashboard/stats/SalesTable";
import { statsData } from "@/lib/constants/stats.constants";

const DashboardStats = () => {
	return (
		<div className='flex-1 space-y-4 p-4 md:p-8 pt-6 overflow-y-auto'>
			<div className='flex md:grid gap-4 overflow-x-auto pb-2 md:overflow-x-visible md:grid-cols-2 lg:grid-cols-4'>
				{statsData.map((stat) => (
					<StatCard
						key={stat.title}
						title={stat.title}
						value={stat.value}
						change={stat.change}
						className={`min-w-[240px] md:min-w-0 ${stat.className}`}
					/>
				))}
			</div>
			<div className='grid gap-4 grid-cols-1 md:grid-cols-4'>
				<SalesChart />
			</div>
			<div className='grid gap-4 grid-cols-1 md:grid-cols-4'>
				<ProductsTable />
			</div>
		</div>
	);
};

export default DashboardStats;
