import type { ColumnProps } from "@/components/table/types";
import type { User } from "@prisma/client";

export const columnsUserApprovals: ColumnProps<User>[] = [
	{
		uid: "name",
		label: "Nome",
		sortable: true,
		filterable: true,
	},
	{
		uid: "email",
		label: "Email	",
		filterable: true,
		renderCell: (row) => row.email ?? "-",
	},
];
