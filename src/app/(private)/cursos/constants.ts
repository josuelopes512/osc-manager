import type { ColumnProps } from "@/app/components/table/types";
import type { Course } from "@prisma/client";

export const columnsCourses: ColumnProps<Course>[] = [
	{
		uid: "name",
		label: "Nome",
		sortable: true,
		filterable: true,
	},
];