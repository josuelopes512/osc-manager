import { questionService } from "@/app/api/question/service";
import { surveyAnswerService } from "@/app/api/surveyAnswer/service";
import { getQuery } from "@/lib/query";
import type {
	CheckBox,
	MultipleChoice,
	Question,
	SurveyAnswer,
} from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

type Params = {
	id: string;
};

export type SurveAnswersDashboard = {
	questions: {
		question: string;
		answers: {
			labels: string[];
			values: number[];
		};
	}[];
};

export async function GET(
	req: NextRequest,
	context: {
		params: Params;
	},
) {
	try {
		const query = getQuery(req);

		const id = Number(context.params.id);

		if (Number.isNaN(id))
			return NextResponse.json(
				{ msg: "Falha ao buscar dados das respostas" },
				{ status: 404 },
			);

		const surveys = (await surveyAnswerService.find({
			...query,
			where: {
				surveyId: id,
			},
			include: {
				responses: {
					include: {
						question: true,
					},
				},
			},
		})) as (SurveyAnswer & {
			responses: {
				question: Question;
				answer: string;
			}[];
		})[];

		const questions = (await questionService.find({
			where: {
				surveyId: id,
				type: { not: "ShortAnswer" },
			},
			include: {
				multipleChoice: true,
				checkBox: true,
			},
		})) as (Question & {
			multipleChoice: MultipleChoice[];
			checkBox: CheckBox[];
		})[];

		const surveyWithoutShortAnswer = surveys
			.map((survey) => ({
				...survey,
				responses: survey.responses.filter(
					({ question }) => question.type !== "ShortAnswer",
				),
			}))
			.filter(({ responses }) => responses.length > 0);

		const surveyAnswersDashboard: SurveAnswersDashboard = {
			questions: [],
		};

		for (const quest of questions) {
			const name = quest.name;
			const answers = {
				labels: [] as string[],
				values: [] as number[],
			};
			if (quest.type === "MultipleChoice") {
				for (const choice of quest.multipleChoice) {
					answers.labels.push(choice.choice);
					const count = surveyWithoutShortAnswer
						.flatMap(({ responses }) => responses)
						.filter(
							({ question: { id: questionId }, answer }) =>
								questionId === quest.id && answer === choice.choice,
						).length;
					answers.values.push(count);
				}
			}
			surveyAnswersDashboard.questions.push({ question: name, answers });
		}

		return NextResponse.json(surveyAnswersDashboard);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao buscar respostas", error },
			{ status: 500 },
		);
	}
}
