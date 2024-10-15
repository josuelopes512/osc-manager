import { accountService } from "@/app/api/account/service";
import type { Account as AccountPrisma, User } from "@prisma/client";
import type { Account } from "next-auth";
import { NextResponse } from "next/server";
import { userService } from "../../user/service";

export async function POST(req: Request) {
	try {
		const accountBody = (await req.json()) as Account;

		const { ref } = accountBody;

		if (!accountBody.userData?.email) {
			return NextResponse.json({ msg: "Email is required" }, { status: 401 });
		}

		let user: User | null = null;
		let acc: AccountPrisma | null = null;

		const account = await accountService.findOne({
			where: {
				provider_providerAccountId: {
					provider: accountBody.provider,
					providerAccountId: String(accountBody.providerAccountId),
				},
			},
		});

		if (!account) {
			acc = await accountService.create({
				data: {
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
					user: {
						connectOrCreate: {
							where: { email: accountBody.userData.email },
							create: {
								email: accountBody.userData.email,
								name: accountBody.userData.name,
							},
						},
					},
				},
			});

			user = (await userService.findOne({
				where: { id: acc.userId },
			})) as User;
		} else {
			await accountService.update({
				where: { id: account.id },
				data: {
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
					user: {
						connectOrCreate: {
							where: { email: accountBody.userData.email },
							create: {
								email: accountBody.userData.email,
								name: accountBody.userData.name,
							},
						},
					},
				},
			});
		}

		console.log("user", account);

		user = await userService.findOne({
			where: { id: (account ?? acc)?.userId },
		});

		if (user?.blocked) {
			return NextResponse.json(
				{ error: "User is blocked, contact support" },
				{ status: 403 }, // 403 Forbidden
			);
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
