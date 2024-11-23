import type { CheckBox, MultipleChoice, QuestionType } from "@prisma/client";

export interface POSTSurveyDTO {
	name: string;
	questions: {
		create: {
			name: string;
			type: QuestionType;
			order: number;
			multipleChoice?: Partial<MultipleChoice>[];
			checkBox?: Partial<CheckBox>[];
		}[];
	};
}
