import type { Survey } from "@prisma/client";

export type SurveyFormProps = Omit<
	Survey,
	"oscId" | "studentIds" | "semesterId"
> & {
	oscId: string;
	students: string[];
	semesterId: string;
};
