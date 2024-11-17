import type { Project } from "@prisma/client";

export type ProjectFormProps = Omit<
	Project,
	"oscId" | "studentIds" | "semesterId"
> & {
	oscId: string;
	students: string[];
	semesterId: string;
};
