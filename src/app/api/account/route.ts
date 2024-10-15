import { accountService } from "@/app/api/account/service";
import { getQuery } from "@/lib/query";
import type { Account } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const query = getQuery(req);
	const accounts = await accountService.find(query);
	return NextResponse.json(accounts, { status: 200 });
}

export async function POST(req: Request) {
	// register account
	const body = (await req.json()) as Account;
	// check if email and password are provided
	if (!body.email || !body.password) {
		return NextResponse.json(
			{ msg: "Email and password are required" },
			{
				status: 400,
			},
		);
	}
	// check if account exists
	const account = await accountService.findOne({
		where: {
			id: Number(body.userId),
			providerAccountId: String(body.providerAccountId),
		},
	});
	if (account) {
		await accountService.update({
			where: { id: account.id },
			data: {
				...body,
				userId: undefined,
			},
		});
	}
	// create new account
	// const password = await accountService.hashPassword(body.password)
	return NextResponse.json(account, { status: 201 });
}
