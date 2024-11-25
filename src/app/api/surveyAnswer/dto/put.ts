import type { POSTSurveyAnswerDTO } from "./post";

export type PUTSurveyAnswerDTO = {
	responses: {
		create: POSTSurveyAnswerDTO["responses"]["create"];
		delete: number[];
	};
};
