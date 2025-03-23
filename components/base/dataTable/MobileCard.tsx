import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import ImageCell from "./ImageCell";
import DropdownActions from "./DropdownActions";
import { Column } from "./DataTable";

const MobileCard = ({ item, columns }: { item: any; columns: Column[] }) => (
	<Card
		key={item.id}
		className='mb-4'
	>
		<CardContent className='p-4'>
			<div className='flex justify-between items-start'>
				<div className='flex-1'>
					{columns
						.filter((col) => !col.hideOnMobile)
						.map((column) => (
							<div
								key={column.key}
								className='mb-2'
							>
								<div className='text-sm text-muted-foreground'>
									{column.label}
								</div>
								{column.key === "status" ? (
									<StatusBadge status={item[column.key]} />
								) : column.key.includes("photo") ||
								  column.key.includes("avatar") ? (
									<ImageCell
										src={item[column.key]}
										isAvatar={true}
									/>
								) : (
									item[column.key]
								)}
							</div>
						))}
				</div>
				<DropdownActions />
			</div>
		</CardContent>
	</Card>
);
export default MobileCard;
