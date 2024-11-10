import type { ColumnProps } from "@/components/table/types";
import type { Project } from "@prisma/client";

export const columnsProjects: ColumnProps<Project>[] = [
	{
		uid: "name",
		label: "Nome",
		sortable: true,
		filterable: true,
	},
];
