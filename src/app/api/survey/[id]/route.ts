import { getQuery } from "@/lib/query";
import { type NextRequest, NextResponse } from "next/server";
import type { PUTSurveyDTO } from "../dto/put";
import { surveyService } from "../service";

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
				{ msg: "Falha ao buscar dados do pesquisa" },
				{ status: 404 },
			);

		const surveys = await surveyService.findOne({
			...query,
			where: { id },
		});
		return NextResponse.json(surveys);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao buscar pesquisas", error },
			{ status: 500 },
		);
	}
}

export async function PUT(
	request: Request,
	context: {
		params: Params;
	},
) {
	try {
		const id = Number(context.params.id);

		if (Number.isNaN(id))
			return NextResponse.json(
				{ msg: "Falha ao atualizar dados do pesquisa" },
				{ status: 404 },
			);

		const data = (await request.json()) as PUTSurveyDTO;
		const survey = await surveyService.update({
			data: {
				...data,
				oscId: undefined,
				semesterId: undefined,
				osc: {
					connect: {
						id: data.oscId,
					},
				},
				semester: {
					connect: {
						id: data.semesterId,
					},
				},
				students: {
					set: data.students.map((student) => ({
						id: student,
					})),
				},
			},
			where: { id },
		});
		return NextResponse.json(survey);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ msg: "Falha ao atualizar pesquisa", error },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	request: Request,
	context: {
		params: Params;
	},
) {
	try {
		const id = Number(context.params.id);

		await surveyService.deleteOne(id);
		return NextResponse.json({ message: "Aluno deletado com sucesso" });
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao deletar pesquisa", error },
			{ status: 500 },
		);
	}
}
