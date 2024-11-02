import { getQuery } from "@/lib/query";
import { type NextRequest, NextResponse } from "next/server";
import type { PUTUserApprovalDTO } from "../dto/put";
import { userApprovalService } from "../service";

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
				{ msg: "Falha ao buscar dados do usuário" },
				{ status: 404 },
			);

		const userApprovals = await userApprovalService.findOne({
			...query,
			where: { id },
		});
		return NextResponse.json(userApprovals);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao buscar usuários", error },
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
				{ msg: "Falha ao atualizar dados do usuário" },
				{ status: 404 },
			);

		const data = (await request.json()) as PUTUserApprovalDTO;
		const userApproval = await userApprovalService.update({
			data,
			where: { id },
		});
		return NextResponse.json(userApproval);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao atualizar usuário", error },
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

		await userApprovalService.deleteOne(id);
		return NextResponse.json({ message: "Aluno deletado com sucesso" });
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao deletar usuário", error },
			{ status: 500 },
		);
	}
}
