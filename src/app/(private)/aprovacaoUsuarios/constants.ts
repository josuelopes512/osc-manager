import type { ColumnProps } from "@/components/table/types";
import type { Course, UserApproval } from "@prisma/client";

export const columnsUserApprovals: ColumnProps<UserApproval>[] = [
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
