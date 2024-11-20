import { getQuery } from "@/lib/query";
import { type NextRequest, NextResponse } from "next/server";
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
				osc: {
					connect: { id: data.oscId },
				},
				oscId: undefined,
				semester: {
					connect: { id: data.semesterId },
				},
				semesterId: undefined,
				students: {
					connect: data.students.map((id) => ({ id })),
				},
				studentIds: undefined,
			},
		} as any);
		return NextResponse.json(survey);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ msg: "Falha ao criar pesquisa", error },
			{ status: 500 },
		);
	}
}
