import { getQuery } from "@/lib/query";
import { type NextRequest, NextResponse } from "next/server";
import { semesterService } from "./service";

export async function GET(req: NextRequest) {
	try {
		const query = getQuery(req);

		const semesters = await semesterService.find(query);
		return NextResponse.json(semesters);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao buscar semestres", error },
			{ status: 500 },
		);
	}
}
