import { getQuery } from "@/lib/query";
import { type NextRequest, NextResponse } from "next/server";
import type { PUTSurveyAnswerDTO } from "../dto/put";
import { surveyAnswerService } from "../service";

type Params = {
	id: string;
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

		const surveys = await surveyAnswerService.findOne({
			...query,
			where: { id },
		});
		return NextResponse.json(surveys);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao buscar respostas", error },
			{ status: 500 },
		);
	}
}

export async function PUT(
	request: NextRequest,
	context: {
		params: Params;
	},
) {
	try {
		const id = Number(context.params.id);

		if (Number.isNaN(id))
			return NextResponse.json(
				{ msg: "Falha ao atualizar dados das respostas" },
				{ status: 404 },
			);

		const data = (await request.json()) as PUTSurveyAnswerDTO;

		const survey = await surveyAnswerService.update({
			where: { id },
			data: {
				responses: {
					createMany: {
						data: data.responses.create.map((response) => ({
							questionId: response.questionId,
							answer: response.answer,
							other: response.other,
						})),
					},
					deleteMany: data.responses?.delete
						? { id: { in: data.responses.delete } }
						: undefined,
				},
			},
		});

		return NextResponse.json(survey);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ msg: "Falha ao atualizar respostas", error },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	request: NextRequest,
	context: {
		params: Params;
	},
) {
	try {
		const id = Number(context.params.id);

		await surveyAnswerService.deleteOne(id);
		return NextResponse.json({ message: "Respostas deletadas com sucesso" });
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao deletar respostas", error },
			{ status: 500 },
		);
	}
}
