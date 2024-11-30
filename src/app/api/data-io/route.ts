import { type NextRequest, NextResponse } from "next/server";
import { fetchHandlers, upsertHandlers } from "./service";

export async function GET(req: NextRequest) {
	try {
		const type = req.nextUrl.searchParams.get("type");

		if (type != null) {
			if (!fetchHandlers[type]) {
				return NextResponse.json(
					{ error: "Tipo de dado inválido. Use 'students', 'courses', 'surveys', 'oscs' ou 'projects'." },
					{ status: 400 }
				);
			}

			const data = await fetchHandlers[type]();
	
			return NextResponse.json(data);
		}

		return NextResponse.json(
			{ error: "Tipo de dado inválido. Use 'students', 'courses', 'surveys', 'oscs' ou 'projects'." }, 
			{ status: 400 }
		);
	} catch (error) {
		console.error(error);

		if (error instanceof Error) {
			return NextResponse.json(
				{ error: "Falha ao processar dados.", details: error.message }, 
				{ status: 500 }
			);
		}
		else {
			return NextResponse.json(
				{ error: "Erro ao exportar dados." }, 
				{ status: 500 }
			);
		}
	}
}

export async function POST(req: NextRequest) {
	try {
		const type = req.nextUrl.searchParams.get("type");
		const data = await req.json();

		if (!Array.isArray(data)) {
			return NextResponse.json(
				{ error: "O corpo da requisição deve ser um array de objetos." },
				{ status: 400 }
			);
		}

		if (type != null) {
			if (!upsertHandlers[type]) {
				return NextResponse.json(
					{ error: "Tipo de dado inválido. Use 'students', 'courses', 'oscs', 'projects' ou 'surveys'." },
					{ status: 400 }
				);
			}

			await Promise.all(data.map(upsertHandlers[type]));
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error(error);

		if (error instanceof Error) {
			return NextResponse.json(
				{ error: "Falha ao processar dados.", details: error.message }, 
				{ status: 500 }
			);
		}
		else {
			return NextResponse.json(
				{ error: error }, 
				{ status: 500 }
			);
		}
	}
}
