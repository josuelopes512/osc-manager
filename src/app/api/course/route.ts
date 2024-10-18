import type { DeleteDefaultDTO } from "@/types/api";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import type { POSTCourseDTO, PUTCourseDTO } from "./dto/post";
import { courseService } from "./service";

const prisma = new PrismaClient();

export async function GET() {
	try {
		const courses = await courseService.find({});
		return NextResponse.json(courses);
	} catch (error) {
		return NextResponse.json(
			{ error: "Falha ao buscar cursos" },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	try {
		const data = (await request.json()) as POSTCourseDTO;
		const course = await courseService.create({ data });
		return NextResponse.json(course);
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
		const data = (await request.json()) as PUTCourseDTO;
		const { id, ...updateData } = data;
		const course = await courseService.update({
			data: updateData,
			where: { id },
		});
		return NextResponse.json(course);
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
		await courseService.deleteOne(id);
		return NextResponse.json({ message: "Curso deletado com sucesso" });
	} catch (error) {
		return NextResponse.json(
			{ error: "Falha ao deletar curso" },
			{ status: 500 },
		);
	}
}
