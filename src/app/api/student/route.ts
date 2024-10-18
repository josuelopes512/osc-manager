import { getQuery } from "@/lib/query";
import type { DeleteDefaultDTO } from "@/types/api";
import { PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";
import type { POSTStudentDTO } from "./dto/post";
import type { PUTStudentDTO } from "./dto/put";
import { studentService } from "./service";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
	try {
		const query = getQuery(req);

		const students = await studentService.find(query);
		return NextResponse.json(students);
	} catch (error) {
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
		return NextResponse.json(
			{ msg: "Falha ao criar aluno", error },
			{ status: 500 },
		);
	}
}

export async function PUT(request: Request) {
	try {
		const data = (await request.json()) as PUTStudentDTO;
		const { id, ...updateData } = data;
		const student = await studentService.update({
			data: updateData,
			where: { id },
		});
		return NextResponse.json(student);
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao atualizar aluno", error },
			{ status: 500 },
		);
	}
}

export async function DELETE(request: Request) {
	try {
		const { id } = (await request.json()) as DeleteDefaultDTO;
		await studentService.deleteOne(id);
		return NextResponse.json({ message: "Curso deletado com sucesso" });
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao deletar aluno", error },
			{ status: 500 },
		);
	}
}
