import { NextResponse } from "next/server";
import { userService } from "../../service";

type Params = {
	id: string;
};

export async function PUT(
	request: Request,
	context: {
		params: Params;
	},
) {
	try {
		const id = context.params.id;

		if (Number.isNaN(id))
			return NextResponse.json(
				{ msg: "Falha ao atualizar dados do usuário" },
				{ status: 404 },
			);

		// const data = (await request.json()) as PUTUserApprovalDTO;
		const userApproval = await userService.update({
			data: {
				approved: true,
			},
			where: { id },
		});
		return NextResponse.json(userApproval);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao atualizar usuário", error },
			{ status: 500 },
		);
	}
}
