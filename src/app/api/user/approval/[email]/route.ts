import { NextResponse } from "next/server";
import { userService } from "../../service";

type Params = {
	email: string;
};

export async function PUT(
	request: Request,
	context: {
		params: Params;
	},
) {
	try {
		const email = context.params.email;

		// const data = (await request.json()) as PUTUserApprovalDTO;
		const userApproval = await userService.update({
			data: {
				approved: true,
			},
			where: { email },
		});
		return NextResponse.json(userApproval);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ msg: "Falha ao atualizar usuário", error },
			{ status: 500 },
		);
	}
}
