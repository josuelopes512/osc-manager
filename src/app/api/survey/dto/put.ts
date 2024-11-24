import { CheckBox, MultipleChoice, QuestionType } from "@prisma/client";
import type { POSTSurveyDTO } from "./post";

export interface PUTSurveyDTO {
	name: string;
	questions: {
		create: POSTSurveyDTO["questions"]["create"];
		delete: number[];
	};
}
