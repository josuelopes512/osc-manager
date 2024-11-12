import { getQuery } from "@/lib/query";
import { type NextRequest, NextResponse } from "next/server";
import type { POSTProjectDTO } from "./dto/post";
import { projectService } from "./service";

export async function GET(req: NextRequest) {
	try {
		const query = getQuery(req);

		const projects = await projectService.find(query);
		return NextResponse.json(projects);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao buscar projetos", error },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	try {
		const data = (await request.json()) as POSTProjectDTO;
		const project = await projectService.create({
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
					connect: data.studentIds.map((id) => ({ id })),
				},
				studentIds: undefined,
			},
		} as any);
		return NextResponse.json(project);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ msg: "Falha ao criar projeto", error },
			{ status: 500 },
		);
	}
}
