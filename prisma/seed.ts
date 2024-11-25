import { prisma } from "@/app/api/prisma/prisma.config";
import {
	courses,
	projects,
	semesters,
	socialMediaPlatforms,
	surveys,
	users,
} from "./contants";

interface Student {
	name: string;
	whatsapp?: string;
	courseId?: string;
}

interface Project {
	id: string;
	name: string;
	description?: string;
	link?: string;
	osc: { name: string };
	students: Student[];
}

async function upsertData(
	entityName: string,
	data: any[],
	upsertHandler: (item: any) => Promise<void>,
) {
	console.log(`Seeding ${entityName} (${data.length} records)...`);
	await Promise.all(
		data.map(async (item) => {
			await upsertHandler(item);
		}),
	);
	console.log(`${entityName} seeded.`);
}

async function seedSocials() {
	await upsertData(
		"social media platforms",
		socialMediaPlatforms,
		async (social) => {
			await prisma.socialPlatform.upsert({
				create: social,
				update: social,
				where: { id: social.id },
			});
		},
	);
}

async function seedCourses() {
	await upsertData("courses", courses, async (course) => {
		await prisma.course.upsert({
			create: course,
			update: course,
			where: { id: course.id },
		});
	});
}

async function seedUsers() {
	await upsertData("users", users, async (user) => {
		await prisma.user.upsert({
			create: user,
			update: user,
			where: { id: user.id },
		});
	});
}

async function seedSemesters() {
	await upsertData("semesters", semesters, async (semester) => {
		await prisma.semester.upsert({
			create: semester,
			update: semester,
			where: { id: semester.id },
		});
	});
}

const seedProjects = async () => {
	await upsertData("projects", projects, async (project) => {
		await prisma.project.upsert({
			create: {
				...project,
				osc: { create: { name: project.osc.name } },
				students: {
					createMany: {
						data: (project.students as Student[]).map((student) => ({
							name: student.name,
							whatsapp: student.whatsapp,
							courseId: 1,
						})),
					},
				},
				semester: {
					connect: { name: "2024.2" },
				},
				id: undefined,
			},
			update: {
				...project,
				osc: { create: { name: project.osc.name } },
				students: {
					createMany: {
						data: (project.students as Student[]).map((student) => ({
							name: student.name,
							courseId: 1,
						})),
					},
				},
				semester: {
					connect: { name: "2024.2" },
				},
				id: undefined,
			},
			where: { id: project.id },
		});
	});
};

async function seedSurveys() {
	await upsertData("surveys", surveys, async (survey) => {
		await prisma.survey.upsert({
			create: { ...survey, questions: undefined },
			update: { ...survey, questions: undefined },
			where: { id: survey.id },
		});

		await Promise.all(
			survey.questions.create
				.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
				.map(async (question: any) => {
					await prisma.question.create({
						data: {
							...question,
							surveyId: survey.id,
							order: question.order,
							multipleChoice: {
								create: question.multipleChoice
									?.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
									.map((choice: any) => ({
										...choice,
										choice: choice.choice ?? "",
									})),
							},
							checkBox: {
								create: question.checkBox
									?.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
									.map((option: any) => ({
										...option,
										option: option.option ?? "",
									})),
							},
						},
					});
				}),
		);
	});
}

async function seed() {
	try {
		console.log("Starting the seeding process...");
		await seedSocials();
		await seedCourses();
		// await seedUsers();
		await seedSemesters();
		await seedSurveys();
		await seedProjects();
	} catch (e) {
		console.error(e);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

seed();
