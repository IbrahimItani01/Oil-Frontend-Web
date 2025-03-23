import React from "react";
import DataTable from "../dataTable/DataTable";
import {
	employeesActions,
	employeesColumns,
	employeesData,
} from "@/lib/content/employees.content";

const EmployeesTable = () => {
	return (
		<DataTable
			columns={employeesColumns}
			data={employeesData}
			actions={employeesActions}
		/>
	);
};

export default EmployeesTable;
