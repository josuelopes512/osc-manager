import type { Survey } from "@prisma/client";

export type SurveyAnswerProps = Survey & {
	questions: {
		id: number;
		name: string;
		multipleChoice: string;
		multipleChoiceOther: string;
		checkBox: string[];
		checkBoxOther: string;
	}[];
};
