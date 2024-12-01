import type { POSTSurveyDTO } from "./post";

export interface PUTSurveyDTO {
	name: string;
	questions: {
		create: POSTSurveyDTO["questions"]["create"];
		delete: number[];
	};
}
