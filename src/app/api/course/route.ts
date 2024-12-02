import { NextResponse } from "next/server";
import type { POSTCourseDTO } from "./dto/post";
import { courseService } from "./service";

export async function GET() {
	try {
		const courses = await courseService.find({});
		return NextResponse.json(courses);
	} catch (error) {
		return NextResponse.json(
			{ error, msg: "Falha ao buscar cursos" },
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
			{ error, msg: "Falha ao criar curso" },
			{ status: 500 },
		);
	}
}
