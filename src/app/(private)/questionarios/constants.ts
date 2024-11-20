import type { ColumnProps } from "@/components/table/types";
import type { OSC, Survey, Semester } from "@prisma/client";

export const columnsSurveys: ColumnProps<
	Survey & { semester: Semester; osc: OSC }
>[] = [
	{
		uid: "name",
		label: "Nome",
		sortable: true,
		filterable: true,
	},
	{
		uid: "semester.name" as any,
		label: "Semestre",
		filterable: true,
		renderCell: (item) => item.semester.name,
	},
	{
		uid: "osc.name" as any,
		label: "OSC",
		sortable: true,
		filterable: true,
		renderCell: (item) => item.osc.name,
	},
];
