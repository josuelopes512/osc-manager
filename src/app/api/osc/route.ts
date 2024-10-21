import { NextResponse } from "next/server";
import type { POSTOSCDTO } from "./dto/post";
import { oscService } from "./service";

export async function GET() {
	try {
		const oscs = await oscService.find({});
		return NextResponse.json(oscs);
	} catch (error) {
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
				// oscSocials: {
				// 	createMany: {
				// 		data: data.oscSocials,
				// 	},
				// },
			},
		});
		return NextResponse.json(osc);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ error, msg: "Falha ao criar OSC" },
			{ status: 500 },
		);
	}
}
