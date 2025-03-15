import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { topProducts } from "@/lib/constants/stats.constants";

export function ProductsTable() {
	return (
		<Card className='col-span-4'>
			<CardHeader>
				<CardTitle>Top Selling Products</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Quantity</TableHead>
							<TableHead className='text-right'>Total</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{topProducts.map((product) => (
							<TableRow key={product.name}>
								<TableCell className='font-medium'>{product.name}</TableCell>
								<TableCell>${product.price.toFixed(2)}</TableCell>
								<TableCell>{product.quantity}</TableCell>
								<TableCell className='text-right'>
									${product.total.toFixed(2)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
