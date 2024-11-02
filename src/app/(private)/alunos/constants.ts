import type { ColumnProps } from "@/components/table/types";
import type { Course, Student } from "@prisma/client";

export const columnsStudents: ColumnProps<Student & { course: Course }>[] = [
	{
		uid: "name",
		label: "Nome",
		sortable: true,
		filterable: true,
	},
	{
		uid: "semester",
		label: "Semestre",
		filterable: true,
		renderCell: (row) => row.semester ?? "-",
	},
	{
		uid: "course.name" as any,
		label: "Curso",
		filterable: true,
		renderCell: (row) => row.course?.name ?? "-",
	},
];
