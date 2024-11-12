import type { Project } from "@prisma/client";

export type ProjectFormProps = Omit<
	Project,
	"oscId" | "studentIds" | "semesterId"
> & {
	oscId: string;
	studentIds: string[];
	semesterId: string;
};
