"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { salesData } from "@/lib/constants/stats.constants";

export function SalesChart() {
	return (
		<Card className='col-span-4'>
			<CardHeader>
				<CardTitle>Total Sales</CardTitle>
			</CardHeader>
			<CardContent className='pl-2'>
				<ResponsiveContainer
					width='100%'
					height={350}
				>
					<BarChart data={salesData}>
						<XAxis
							dataKey='month'
							stroke='#888888'
							fontSize={12}
							axisLine={true}
						/>
						<YAxis
							stroke='#888888'
							fontSize={12}
							axisLine={true}
							tickFormatter={(value) => `${value / 1000}K`}
						/>
						<Bar
							dataKey='total'
							fill='currentColor'
							radius={[4, 4, 0, 0]}
							className='fill-primary opacity-70'
							barSize={50}
						/>
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
