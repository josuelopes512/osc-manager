import { getQuery } from "@/lib/query";
import type { DeleteDefaultDTO } from "@/types/api";
import { type NextRequest, NextResponse } from "next/server";
import type { PUTSocialPlatformDTO } from "../dto/put";
import { socialPlatformService } from "../service";

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
				{ msg: "Falha ao buscar dados da plataforma social" },
				{ status: 404 },
			);

		const socialPlatforms = await socialPlatformService.findOne({
			...query,
			where: { id },
		});
		return NextResponse.json(socialPlatforms);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao buscar plataformas sociais", error },
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
				{ msg: "Falha ao atualizar dados da plataforma social" },
				{ status: 404 },
			);

		const data = (await request.json()) as PUTSocialPlatformDTO;
		const socialPlatform = await socialPlatformService.update({
			data,
			where: { id },
		});
		return NextResponse.json(socialPlatform);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao atualizar plataforma social", error },
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

		await socialPlatformService.deleteOne(id);
		return NextResponse.json({
			message: "plataforma social deletada com sucesso",
		});
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao deletar plataforma social", error },
			{ status: 500 },
		);
	}
}
