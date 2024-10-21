import { getQuery } from "@/lib/query";
import { type NextRequest, NextResponse } from "next/server";
import type { POSTSocialPlatformDTO } from "./dto/post";
import { socialPlatformService } from "./service";

export async function GET(req: NextRequest) {
	try {
		const query = getQuery(req);

		const socialPlatforms = await socialPlatformService.find(query);
		return NextResponse.json(socialPlatforms);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao buscar plataformas sociais", error },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	try {
		const data = (await request.json()) as POSTSocialPlatformDTO;
		const socialPlatform = await socialPlatformService.create({ data });
		return NextResponse.json(socialPlatform);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao criar plataforma social", error },
			{ status: 500 },
		);
	}
}
