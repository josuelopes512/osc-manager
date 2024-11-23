import type {
	CheckBox,
	MultipleChoice,
	QuestionType,
	Survey,
} from "@prisma/client";
import type { ArrayPath, Control, FieldValues } from "react-hook-form";

export type NestedFieldArrayProps<T extends FieldValues, K extends string> = {
	control: Control<T, K>;
	name: ArrayPath<T>;
};

export type SurveyWithQuestions = Survey & {
	questions: {
		id?: number;
		name: string;
		order: number;
		type?: QuestionType;
		multipleChoice?: Partial<MultipleChoice>[];
		checkBox?: Partial<CheckBox>[];
	}[];
};
