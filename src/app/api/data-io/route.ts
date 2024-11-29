import { PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const students = await prisma.student.findMany({
            select: {
              id: true,
              name: true,
              matriculation: true,
              email: true,
              whatsapp: true,
              courseId: true,
              oscId: true,
              projectId: true,
            },
          });
        return NextResponse.json(students);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao exportar alunos." }, { status: 500 });
    }
}

export async function POST(request: Request) {
	try {
		const students = await request.json();

		if (!Array.isArray(students)) 
		{
			return NextResponse.json({ error: "O corpo da requisição deve ser um array de alunos." }, { status: 400 });
		}
		
        const createdStudents = await prisma.student.createMany({
            data: students.map(student => ({
              name: student.name,
              matriculation: student.matriculation,
              email: student.email,
              whatsapp: student.whatsapp,
              courseId: student.courseId,
              oscId: student.oscId,
              projectId: student.projectId,
            })),
            skipDuplicates: true, // Evita duplicatas com base nas restrições únicas
          });

		return NextResponse.json({ success: true, count: createdStudents.count });
	} catch (error) {
		return NextResponse.json(
			{ msg: "Falha ao criar aluno", error },
			{ status: 500 },
		);
	}
}
