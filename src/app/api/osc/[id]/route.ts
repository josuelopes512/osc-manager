import { getQuery } from "@/lib/query";
import { type NextRequest, NextResponse } from "next/server";
import type { PUTOSCDTO } from "../dto/put";
import { oscService } from "../service";

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
				{ msg: "Falha ao buscar dados do OSC" },
				{ status: 404 },
			);

		const oscs = await oscService.findOne({
			...query,
			where: { id },
		});
		return NextResponse.json(oscs);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao buscar OSCs", error },
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
				{ msg: "Falha ao atualizar dados do OSC" },
				{ status: 404 },
			);

		const data = (await request.json()) as PUTOSCDTO;
		const osc = await oscService.update({
			data,
			where: { id },
		});
		return NextResponse.json(osc);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao atualizar OSC", error },
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

		await oscService.deleteOne(id);
		return NextResponse.json({ message: "OSC deletado com sucesso" });
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao deletar OSC", error },
			{ status: 500 },
		);
	}
}
