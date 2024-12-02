import { getQuery } from "@/lib/query";
import { type NextRequest, NextResponse } from "next/server";
import type { POSTStudentDTO } from "./dto/post";
import { studentService } from "./service";

export async function GET(req: NextRequest) {
	try {
		const query = getQuery(req);

		const students = await studentService.find(query);
		return NextResponse.json(students);
	} catch (error) {
		console.log("error", error);
		return NextResponse.json(
			{ msg: "Falha ao buscar alunos", error },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	try {
		const data = (await request.json()) as POSTStudentDTO;
		const student = await studentService.create({
			data: {
				...data,
				course: {
					connect: { id: data.courseId },
				},
				courseId: undefined,
			},
		});
		return NextResponse.json(student);
	} catch (error) {
		console.log(error);

		return NextResponse.json(
			{ msg: "Falha ao criar aluno", error },
			{ status: 500 },
		);
	}
}
