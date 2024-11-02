import { getQuery } from "@/lib/query";
import { type NextRequest, NextResponse } from "next/server";
import { userApprovalService } from "./service";

export async function GET(req: NextRequest) {
	try {
		const query = getQuery(req);

		const userApprovals = await userApprovalService.find(query);
		return NextResponse.json(userApprovals);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao buscar usuários", error },
			{ status: 500 },
		);
	}
}
