import type { ColumnProps } from "@/components/table/types";
import type { OSC, Survey, Semester } from "@prisma/client";

export const columnsSurveys: ColumnProps<Survey>[] = [
	{
		uid: "name",
		label: "Nome",
		sortable: true,
		filterable: true,
	},
];
