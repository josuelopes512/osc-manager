export type ColumnProps<TData extends Record<string, any>> = {
	uid: keyof TData | "actions" | "expand";
	label: string;
	renderCell?: (item: TData) => React.ReactNode;
	sortable?: boolean;
	filterable?: boolean;
};

export type TableProps<TData extends Record<string, any>> = {
	data?: TData[];
	columns: ColumnProps<TData>[];
	showColumnsFilter?: boolean;
	rowsPagination?: number[];
	rowsPerPage?: number;
	loading?: boolean;
};
