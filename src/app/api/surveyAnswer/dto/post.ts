type SurveyAnswerResponse = {
	questionId: number;
	answer: string;
	other?: string;
};

export type POSTSurveyAnswerDTO = {
	surveyId: number;
	responses: { create: SurveyAnswerResponse[] };
};
