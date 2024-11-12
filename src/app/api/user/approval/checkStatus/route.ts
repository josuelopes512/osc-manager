import { getQuery } from "@/lib/query";
import { type NextRequest, NextResponse } from "next/server";
import { userService } from "../../service";

export async function GET(req: NextRequest) {
	try {
		const query = getQuery(req);

		const users = await userService.findOne(query);
		return NextResponse.json(users);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao buscar usuários", error },
			{ status: 500 },
		);
	}
}
