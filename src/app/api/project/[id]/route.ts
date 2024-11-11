import { getQuery } from "@/lib/query";
import { type NextRequest, NextResponse } from "next/server";
import type { PUTProjectDTO } from "../dto/put";
import { projectService } from "../service";

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
				{ msg: "Falha ao buscar dados do aluno" },
				{ status: 404 },
			);

		const projects = await projectService.findOne({
			...query,
			where: { id },
		});
		return NextResponse.json(projects);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao buscar alunos", error },
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
				{ msg: "Falha ao atualizar dados do aluno" },
				{ status: 404 },
			);

		const data = (await request.json()) as PUTProjectDTO;
		const project = await projectService.update({
			data,
			where: { id },
		});
		return NextResponse.json(project);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao atualizar aluno", error },
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

		await projectService.deleteOne(id);
		return NextResponse.json({ message: "Aluno deletado com sucesso" });
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao deletar aluno", error },
			{ status: 500 },
		);
	}
}
