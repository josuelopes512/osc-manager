import { accountService } from "@/app/api/account/service";
import { userService } from "@/app/api/user/service";
import type { Account as AccountPrisma, User } from "@prisma/client";
import type { Account } from "next-auth";
import { NextResponse } from "next/server";
// import { userApprovalService } from "../../userApproval/service";

export async function POST(req: Request) {
	try {
		const accountBody = (await req.json()) as Account;

		if (!accountBody.userData?.email) {
			return NextResponse.json({ msg: "Email is required" }, { status: 401 });
		}

		// const userApproval = await userApprovalService.findOne({
		// 	where: { email: accountBody.userData.email },
		// });

		// if (!userApproval) {
		// 	await userApprovalService.create({
		// 		data: {
		// 			email: accountBody.userData.email,
		// 			name: accountBody.userData.name,
		// 		},
		// 	});
		// 	return NextResponse.json(
		// 		{ msg: "User approval required" },
		// 		{ status: 403 },
		// 	);
		// }

		// if (userApproval.approved === false) {
		// 	return NextResponse.json({ msg: "User not approved" }, { status: 403 });
		// }

		const account = await accountService.findOne({
			where: {
				provider_providerAccountId: {
					provider: accountBody.provider,
					providerAccountId: String(accountBody.providerAccountId),
				},
			},
		});

		let acc: AccountPrisma | null = null;

		if (!account) {
			const ddata = {
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
			};
			console.log(ddata);
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
		} else {
			acc = await accountService.update({
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
		const user = await userService.findOne({
			where: { id: acc?.userId },
		});

		if (!user) {
			return NextResponse.json({ msg: "User not found" }, { status: 404 });
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
