import { type NextRequest, NextResponse } from "next/server";
import type { POSTOSCDTO } from "./dto/post";
import { oscService } from "./service";
import { getQuery } from "@/lib/query";

export async function GET(req: NextRequest) {
	try {
		const query = getQuery(req);

		const oscs = await oscService.find(query);
		return NextResponse.json(oscs);
	} catch (error) {
		console.log("error", error);
		return NextResponse.json(
			{ error, msg: "Falha ao buscar OSCs" },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	try {
		const data = (await request.json()) as POSTOSCDTO;
		const osc = await oscService.create({
			data: {
				...data,
				oscSocials: {
					createMany: {
						data: data.oscSocials?.create,
					},
				},
				address: {
					create: data.address,
				},
			},
		});
		return NextResponse.json(osc);
	} catch (error) {
		return NextResponse.json(
			{ error, msg: "Falha ao criar OSC" },
			{ status: 500 },
		);
	}
}
