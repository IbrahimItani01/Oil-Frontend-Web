"use client";
import { useMobile } from "@/lib/hooks/useMobile.hook";
import MobileCard from "./MobileCard";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui/table";
import Row from "./Row";
import { DataTableProvider } from "@/hooks/context/DataTableContext";

export interface Column {
	key: string;
	label: string;
	render?: (value: any) => React.ReactNode;
	hideOnMobile?: boolean;
}
interface DataTableProps {
	data: any[];
	columns: Column[];
	actions: string[];
}

const DataTable = ({ data, columns, actions }: DataTableProps) => {
	const isMobile = useMobile();

	if (isMobile) {
		return (
			<div className='space-y-4'>
				{data.map((item) => (
					<DataTableProvider actions={actions}>
						<MobileCard
							key={item.id}
							item={item}
							columns={columns}
						/>
					</DataTableProvider>
				))}
			</div>
		);
	}

	return (
		<DataTableProvider actions={actions}>
			<div className='rounded-md border overflow-x-auto'>
				<Table>
					<TableHeader>
						<TableRow>
							{columns.map((column) => (
								<TableHead key={column.key}>{column.label}</TableHead>
							))}
							<TableHead className='w-[50px]'></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((item) => (
							<Row
								key={item.id}
								item={item}
								columns={columns}
							/>
						))}
					</TableBody>
				</Table>
			</div>
		</DataTableProvider>
	);
};
export default DataTable;
