import { getQuery } from "@/lib/query";
import { type NextRequest, NextResponse } from "next/server";
import type { POSTSurveyDTO } from "./dto/post";
import { surveyService } from "./service";
import { questionService } from "../questions/service";

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
		// const survey = { id: 9 };
		// console.log(data);

		await Promise.all(
			data.questions.create
				.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
				.map(async (question) => {
					await questionService.create({
						data: {
							...question,
							surveyId: survey.id,
							order: question.order,
							multipleChoice: {
								create: question.multipleChoice
									?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
									.map((choice) => ({
										...choice,
										choice: choice.choice ?? "",
									})),
							},
							checkBox: {
								create: question.checkBox
									?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
									.map((option) => ({
										...option,
										option: option.option ?? "",
									})),
							},
						},
					});
				}),
		);
		return NextResponse.json(survey);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ msg: "Falha ao criar pesquisa", error },
			{ status: 500 },
		);
	}
}
