import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
	try {
		const students = await prisma.student.findMany();
		return NextResponse.json(students);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch students" },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	try {
		const data = await request.json();
		const student = await prisma.student.create({ data });
		return NextResponse.json(student);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to create student" },
			{ status: 500 },
		);
	}
}

export async function PUT(request: Request) {
	try {
		const data = await request.json();
		const { id, ...updateData } = data;
		const student = await prisma.student.update({
			where: { id },
			data: updateData,
		});
		return NextResponse.json(student);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to update student" },
			{ status: 500 },
		);
	}
}

export async function DELETE(request: Request) {
	try {
		const { id } = await request.json();
		await prisma.student.delete({ where: { id } });
		return NextResponse.json({ message: "Student deleted successfully" });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to delete student" },
			{ status: 500 },
		);
	}
}
