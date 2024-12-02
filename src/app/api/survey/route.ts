import { getQuery } from "@/lib/query";
import { type NextRequest, NextResponse } from "next/server";
import { questionService } from "../question/service";
import type { POSTSurveyDTO } from "./dto/post";
import { surveyService } from "./service";

export async function GET(req: NextRequest) {
	try {
		const query = getQuery(req);
		const surveys = await surveyService.find(query);
		return NextResponse.json(surveys);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao buscar pesquisas", error },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	try {
		const data = (await request.json()) as POSTSurveyDTO;

		const survey = await surveyService.create({
			data: {
				...data,
				questions: undefined,
			},
		});

		const sortedQuestions = data.questions.create.sort(
			(a, b) => (a.order ?? 0) - (b.order ?? 0),
		);

		for (const question of sortedQuestions) {
			await questionService.create({
				data: {
					...question,
					surveyId: survey.id,
					order: question.order,
					multipleChoice: {
						create: Array.isArray(question?.multipleChoice)
							? question.multipleChoice
									.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
									.map((choice) => ({
										...choice,
										choice: choice?.choice ?? "",
										other: choice?.other ?? "",
										order: choice?.order ?? 0,
									}))
							: [],
					},
					checkBox: {
						create: Array.isArray(question?.checkBox)
							? question.checkBox
									.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
									.map((option) => ({
										...option,
										option: option?.option ?? "",
										other: option?.other ?? "",
										order: option?.order ?? 0,
									}))
							: [],
					},
				},
			});
		}

		return NextResponse.json(survey);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ msg: "Falha ao criar questionário", error },
			{ status: 500 },
		);
	}
}
