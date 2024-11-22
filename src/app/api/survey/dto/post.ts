import type { CheckBox, MultipleChoice, QuestionType } from "@prisma/client";

export interface POSTSurveyDTO {
	name: string;
	questions: {
		create: {
			name: string;
			type: QuestionType;
			multipleChoice?: Partial<MultipleChoice>[];
			checkBox?: Partial<CheckBox>[];
		}[];
	};
}
