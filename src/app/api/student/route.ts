import type { DeleteDefaultDTO } from "@/types/api";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import type { POSTStudentDTO } from "./dto/post";
import type { PUTStudentDTO } from "./dto/put";
import { studentService } from "./service";

const prisma = new PrismaClient();

export async function GET() {
	try {
		const students = await studentService.find({});
		return NextResponse.json(students);
	} catch (error) {
		return NextResponse.json(
			{ error: "Falha ao buscar cursos" },
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
			{ error: "Falha ao criar curso" },
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
			{ error: "Falha ao atualizar curso" },
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
			{ error: "Falha ao deletar curso" },
			{ status: 500 },
		);
	}
}
