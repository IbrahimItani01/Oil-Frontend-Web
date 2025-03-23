import { createContext, useContext } from "react";

interface DataTableContextType {
	actions: string[];
}

const DataTableContext = createContext<DataTableContextType | undefined>(
	undefined
);

export const DataTableProvider = ({
	actions,
	children,
}: {
	actions: string[];
	children: React.ReactNode;
}) => {
	return (
		<DataTableContext.Provider value={{ actions }}>
			{children}
		</DataTableContext.Provider>
	);
};

export const useDataTableContext = () => {
	const context = useContext(DataTableContext);
	if (!context) {
		throw new Error(
			"useDataTableContext must be used within a DataTableProvider"
		);
	}
	return context;
};
