import { getQuery } from "@/lib/query";
import type { DeleteDefaultDTO } from "@/types/api";
import { type NextRequest, NextResponse } from "next/server";
import type { PUTCourseDTO } from "../dto/put";
import { courseService } from "../service";

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
				{ msg: "Falha ao buscar dados do curso" },
				{ status: 404 },
			);

		const courses = await courseService.findOne({
			...query,
			where: { id },
		});
		return NextResponse.json(courses);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao buscar cursos", error },
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
				{ msg: "Falha ao atualizar dados do curso" },
				{ status: 404 },
			);

		const data = (await request.json()) as PUTCourseDTO;
		const course = await courseService.update({
			data,
			where: { id },
		});
		return NextResponse.json(course);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao atualizar curso", error },
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

		await courseService.deleteOne(id);
		return NextResponse.json({ message: "Curso deletado com sucesso" });
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao deletar curso", error },
			{ status: 500 },
		);
	}
}
