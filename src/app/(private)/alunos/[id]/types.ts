import type { Student } from "@prisma/client";

export type StudentFormProps = Omit<Student, "courseId"> & {
	courseId: string;
};
