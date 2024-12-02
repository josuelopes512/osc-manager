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
	{ params }: { params: { id: string } },
) {
	try {
		const id = Number(params.id);
		const data = (await request.json()) as PUTOSCDTO;

		const osc = await oscService.update({
			where: { id },
			data: {
				name: data.name,
				address: !data.address?.id
					? {
							create: data.address,
						}
					: { update: data.address },
				oscSocials: {
					create: data.oscSocials?.create,
					update: data.oscSocials?.update?.map((social) => ({
						where: { id: social.id },
						data: {
							link: social.link,
							socialPlatformId: social.socialPlatformId,
						},
					})),
					deleteMany: data.oscSocials?.delete
						? { id: { in: data.oscSocials.delete } }
						: undefined,
				},
			},
		});

		return NextResponse.json(osc);
	} catch (error) {
		return NextResponse.json(
			{ error, msg: "Falha ao atualizar OSC" },
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
		return NextResponse.json({ message: "OSC deletada com sucesso" });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ msg: "Falha ao deletar OSC", error },
			{ status: 500 },
		);
	}
}
