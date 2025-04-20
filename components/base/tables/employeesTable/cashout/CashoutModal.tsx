import { useEffect } from "react";
import { format } from "date-fns";
import { Check, Clock, DollarSign, Package, X } from "lucide-react";
import {
	toggleOrderSelection,
	selectAllOrders,
	cashOutSelectedOrders,
	resetSelection,
	setOrders,
} from "@/store/slices/orders.slice";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Employee } from "@/lib/content/employees.content";
import { Order } from "@/lib/content/orders.content";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { updateEmployeeBalance } from "@/store/slices/employees.slice";

interface CashOutModalProps {
	employee: Employee;
	cashOutOpen: boolean;
	setCashOutOpen: (n: boolean) => void;
}

const CashOutModal = ({
	employee,
	setCashOutOpen,
	cashOutOpen,
}: CashOutModalProps) => {
	const dispatch = useAppDispatch();
	const { orders, selectedOrderIds } = useAppSelector((state) => state.orders);

	// Filter today's orders for this specific employee and not cashed out
	const employeeOrders = orders.filter(
		(order) => order.employeeId === employee.id && !order.cashedOut
	);

	const handleOrderToggle = (orderId: string) => {
		dispatch(toggleOrderSelection(orderId));
	};

	const handleSelectAll = () => {
		dispatch(selectAllOrders());
	};

	const handleConfirm = () => {
		// Calculate the total cashout amount
		const totalCashOutAmount = employeeOrders
			.filter((order) => selectedOrderIds.includes(order.id))
			.reduce((sum, order) => sum + order.total, 0);

		// Update the employee's balance (subtract the cashout amount)
		dispatch(
			updateEmployeeBalance({
				employeeId: employee.id,
				amount: totalCashOutAmount,
			})
		);

		// Perform the cashout and reset the selection
		dispatch(cashOutSelectedOrders());
		dispatch(resetSelection());
		setCashOutOpen(false);
	};

	const totalAmount = employeeOrders
		.filter((order) => selectedOrderIds.includes(order.id))
		.reduce((sum, order) => sum + order.total, 0)
		.toFixed(2);

	useEffect(() => {
		// Optional: reset selection when modal opens or closes
		if (!cashOutOpen) dispatch(resetSelection());
	}, [cashOutOpen]);

	return (
		<Dialog
			open={cashOutOpen}
			onOpenChange={setCashOutOpen}
		>
			<DialogContent className='sm:max-w-[500px] md:max-w-[600px]'>
				<DialogHeader className='flex flex-row items-center justify-between'>
					<div>
						<DialogTitle className='text-xl'>
							Pending Orders for {employee.name}
						</DialogTitle>
						<DialogDescription>
							{employeeOrders.length} orders
						</DialogDescription>
					</div>
				</DialogHeader>

				<div className='flex items-center justify-between py-2'>
					<div className='flex items-center space-x-2'>
						<Checkbox
							id='selectAll'
							checked={
								employeeOrders.every((order) =>
									selectedOrderIds.includes(order.id)
								) && employeeOrders.length > 0
							}
							className='cursor-pointer'
							onCheckedChange={handleSelectAll}
						/>

						<label
							htmlFor='selectAll'
							className='text-sm font-medium'
						>
							Select All Orders
						</label>
					</div>
					<Badge variant='outline'>
						{
							selectedOrderIds.filter((id) =>
								orders.find(
									(order) => order.id === id && order.employeeId === employee.id
								)
							).length
						}{" "}
						selected
					</Badge>
				</div>

				<Separator />

				<ScrollArea className='max-h-[400px] pr-4'>
					<div className='space-y-3 py-2'>
						{employeeOrders.map((order) => (
							<div
								key={order.id}
								className={`flex items-center space-x-4 rounded-lg border p-3 transition-colors ${
									selectedOrderIds.includes(order.id)
										? "border-primary bg-primary/5"
										: ""
								}`}
							>
								<Checkbox
									id={order.id}
									checked={selectedOrderIds.includes(order.id)}
									onCheckedChange={() => handleOrderToggle(order.id)}
								/>
								<div className='flex-1 space-y-1'>
									<div className='flex items-center justify-between'>
										<div className='flex items-center space-x-2'>
											<Package className='h-4 w-4 text-muted-foreground' />
											<span className='font-medium'>{order.id}</span>
										</div>
										<span className='font-medium text-green-600'>
											${order.total.toFixed(2)}
										</span>
									</div>
									<div className='flex items-center justify-between text-sm text-muted-foreground'>
										<span>{order.customerId}</span>
										<div className='flex items-center space-x-2'>
											<Clock className='h-3 w-3' />
											<span>{order.date}</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</ScrollArea>

				<Separator />

				<DialogFooter className='flex items-center justify-between sm:justify-between'>
					<div className='flex items-center space-x-2'>
						<DollarSign className='h-4 w-4 text-muted-foreground' />
						<span className='text-sm font-medium'>
							Total: <span className='text-green-600'>${totalAmount}</span>
						</span>
					</div>
					<Button
						onClick={handleConfirm}
						disabled={selectedOrderIds.length === 0}
						className='gap-2'
					>
						<Check className='h-4 w-4' />
						Confirm Cashout
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CashOutModal;
