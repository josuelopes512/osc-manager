type SurveyAnswerResponse = {
	questionId: number;
	answer: string;
	other?: string;
};

export type POSTSurveyAnswerDTO = {
	surveyId: number;
	oscId: number;
	studentId: number;
	responses: { create: SurveyAnswerResponse[] };
};
