import { TableCell, TableRow } from "@/components/ui/table";
import StatusBadge from "./StatusBadge";
import ImageCell from "./ImageCell";
import DropdownActions from "./DropdownActions";
import { Column } from "./DataTable";
  
interface RowProps {
  item: any;
  columns: Column[];
}

const Row = ({ item, columns }: RowProps) => (
  <TableRow key={item.id}>
    {columns.map((column) => (
      <TableCell key={column.key}>
        {column.render ? (
          column.render(item[column.key])
        ) : column.key === "status" ? (
          <StatusBadge status={item[column.key]} />
        ) : column.key.includes("photo") || column.key.includes("avatar") ? (
          <ImageCell src={item[column.key]} isAvatar={true} />
        ) : (
          item[column.key]
        )}
      </TableCell>
    ))}
    <TableCell>
      <DropdownActions />
    </TableCell>
  </TableRow>
);
export default Row;
