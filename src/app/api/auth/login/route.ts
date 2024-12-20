import { userService } from "@/app/api/user/service";
import type { Account } from "next-auth";
import { NextResponse } from "next/server";
import { users } from "../../../../../prisma/constants";
import { accountService } from "../../account/service";
import { prisma } from "../../prisma/prisma.config";
// import { userApprovalService } from "../../userApproval/service";

export async function POST(req: Request) {
	try {
		const accountBody = (await req.json()) as Account;

		if (!accountBody.userData?.email) {
			return NextResponse.json({ msg: "Email is required" }, { status: 401 });
		}

		let user = await userService.findOne({
			where: { email: accountBody.userData.email },
		});

		let account = await accountService.findOne({
			where: {
				provider_providerAccountId: {
					provider: accountBody.provider,
					providerAccountId: accountBody.providerAccountId,
				},
			},
		});

		// check if user is in the list of users
		const userInList = users.find(
			(user) => user.email === accountBody.userData?.email,
		);

		if (!user) {
			user = await userService.create({
				data: {
					id: String(accountBody.userData.id),
					email: accountBody.userData.email,
					name: accountBody.userData.name,
					approved: userInList?.approved || false,
					accounts: {
						create: {
							type: accountBody.type,
							provider: accountBody.provider,
							providerAccountId: accountBody.providerAccountId,
							refresh_token: accountBody.refresh_token,
							access_token: accountBody.access_token,
							expires_at: accountBody.expires_at,
							id_token: accountBody.id_token,
							token_type: accountBody.token_type,
							scope: accountBody.scope,
							session_state: String(accountBody.session_state),
						},
					},
				},
			});
			if (user.approved === false) {
				return NextResponse.json({ msg: "User not approved" }, { status: 403 });
			}
			return NextResponse.json(user, { status: 200 });
		}

		if (!account) {
			account = await prisma.account.upsert({
				where: {
					provider_providerAccountId: {
						provider: accountBody.provider,
						providerAccountId: accountBody.providerAccountId,
					},
				},
				update: {
					refresh_token: accountBody.refresh_token,
					access_token: accountBody.access_token,
					expires_at: accountBody.expires_at,
					id_token: accountBody.id_token,
					token_type: accountBody.token_type,
					scope: accountBody.scope,
					session_state: String(accountBody.session_state),
				},
				create: {
					provider: accountBody.provider,
					providerAccountId: accountBody.providerAccountId,
					type: accountBody.type,
					refresh_token: accountBody.refresh_token,
					access_token: accountBody.access_token,
					expires_at: accountBody.expires_at,
					id_token: accountBody.id_token,
					token_type: accountBody.token_type,
					scope: accountBody.scope,
					session_state: String(accountBody.session_state),
					user: {
						connectOrCreate: {
							where: { email: accountBody.userData.email },
							create: {
								id: String(accountBody.userData.id),
								email: accountBody.userData.email,
								name: accountBody.userData.name,
								approved: userInList?.approved || false,
							},
						},
					},
				},
			});
			
		}

		if (user.approved === false) {
			return NextResponse.json({ msg: "User not approved" }, { status: 403 });
		}

		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		console.error("Error while trying to log-in", error);
		return NextResponse.json(
			{ msg: "Error while trying to log-in" },
			{ status: 500 },
		);
	}
}
