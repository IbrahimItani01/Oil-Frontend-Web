import { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
	status: string;
};
type StatusVariant =
	| "destructive"
	| "warning"
	| "success"
	| "default"
	| "secondary"
	| "outline"
	| "info";

const statusVariantMap: Record<string, StatusVariant> = {
	canceled: "destructive",
	"in progress": "default",
	scheduled: "warning",
	completed: "success",
	"out of stock": "destructive",
	active: "default",
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
	const variant: StatusVariant =
		statusVariantMap[status.toLowerCase()] || "default";

	return <Badge variant={variant}>{status}</Badge>;
};

export default StatusBadge;
