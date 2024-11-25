import type { Survey } from "@prisma/client";

export type SurveyAnswerFormProps = Survey & {
	questions: {
		id: number;
		name: string;
		multipleChoice: string;
		multipleChoiceOther: string;
		checkBox: string[];
		checkBoxOther: string;
	}[];
};
