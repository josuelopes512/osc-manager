import { NextResponse } from "next/server";
import type { POSTSurveyAnswerDTO } from "./dto/post";
import { surveyAnswerService } from "./service";

export async function POST(request: Request) {
	try {
		const data = (await request.json()) as POSTSurveyAnswerDTO;
		console.log(data.responses.create);

		const survey = await surveyAnswerService.create({
			data: {
				survey: {
					connect: { id: data.surveyId },
				},
				responses: {
					createMany: {
						data: data.responses.create.map((response) => ({
							questionId: response.questionId,
							answer: response.answer,
							other: response.other,
						})),
					},
				},
			},
		});
		return NextResponse.json(survey);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ msg: "Falha ao responder questionário", error },
			{ status: 500 },
		);
	}
}
