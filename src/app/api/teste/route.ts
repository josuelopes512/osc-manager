import { getQuery } from "@/lib/query";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		return NextResponse.json({ msg: "Hello World" });
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao buscar usuários", error },
			{ status: 500 },
		);
	}
}
