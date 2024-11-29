import { PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get("type");

    let data;
    switch (type) {
      case "students":
        data = await prisma.student.findMany({
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
        break;

      case "courses":
        data = await prisma.course.findMany({
          select: {
            id: true,
            name: true,
            description: true,
          },
        });
        break;

      case "enrollments":
        data = await prisma.enrollment.findMany({
          select: {
            id: true,
            studentId: true,
            courseId: true,
            enrollmentDate: true,
          },
        });
        break;

      default:
        return NextResponse.json(
          { error: "Tipo de dado inválido. Use 'students', 'courses' ou 'enrollments'." },
          { status: 400 }
        );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao exportar dados." }, { status: 500 });
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

    let createdCount;

    switch (type) {
      case "students":
        createdCount = await prisma.student.createMany({
          data: data.map((student) => ({
            name: student.name,
            matriculation: student.matriculation,
            email: student.email,
            whatsapp: student.whatsapp,
            courseId: student.courseId,
            oscId: student.oscId,
            projectId: student.projectId,
          })),
          skipDuplicates: true,
        });
        break;

      case "courses":
        createdCount = await prisma.course.createMany({
          data: data.map((course) => ({
            name: course.name,
            description: course.description,
          })),
          skipDuplicates: true,
        });
        break;

    //   case "enrollments":
    //     createdCount = await prisma.enrollment.createMany({
    //       data: data.map((enrollment) => ({
    //         studentId: enrollment.studentId,
    //         courseId: enrollment.courseId,
    //         enrollmentDate: new Date(enrollment.enrollmentDate),
    //       })),
    //       skipDuplicates: true,
    //     });
    //     break;

      default:
        return NextResponse.json(
          { error: "Tipo de dado inválido. Use 'students', 'courses' ou 'enrollments'." },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, count: createdCount.count });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Falha ao importar dados.", details: error },
      { status: 500 }
    );
  }
}
