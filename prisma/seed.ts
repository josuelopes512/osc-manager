import { prisma } from "@/app/api/prisma/prisma.config";
import {
	courses,
	projects,
	semesters,
	socialMediaPlatforms,
	surveyAnswers,
	surveys,
	users,
} from "./constants/index";

interface Student {
	name: string;
	whatsapp?: string;
	courseId?: string;
}

/**
 * Asynchronously upserts data for a specific entity.
 *
 * @param entityName - The name of the entity being upserted.
 * @param data - An array of data items to be upserted.
 * @param upsertHandler - A handler function that performs the upsert operation for each item.
 */
async function upsertData<T>(
	entityName: string,
	data: T[],
	upsertHandler: (item: T) => Promise<void>,
) {
	console.log(`Seeding ${entityName} (${data.length} records)...`);
	await Promise.all(
		data.map(async (item) => {
			await upsertHandler(item);
		}),
	);
	console.log(`${entityName} seeded.`);
}

/**
 * Seeds the database with social media platforms data by upserting each platform.
 * Utilizes the provided upsertData utility function to handle bulk operations.
 */
async function seedSocials() {
	try {
		await upsertData(
			"social media platforms",
			socialMediaPlatforms,
			async (social) => {
				await prisma.socialPlatform.upsert({
					create: { ...social, id: undefined },
					update: { ...social, id: undefined },
					where: { id: social.id },
				});
			},
		);
	} catch (error) {
		console.error("Error seeding social media platforms:", error);
	}
}

/**
 * Seeds the database with courses data by upserting each course.
 * Utilizes the provided upsertData utility function to handle bulk operations.
 */
async function seedCourses() {
	try {
		await upsertData("courses", courses, async (course) => {
			await prisma.course.upsert({
				create: { ...course, id: undefined },
				update: { ...course, id: undefined },
				where: { id: course.id },
			});
		});
	} catch (error) {
		console.error("Error seeding courses:", error);
	}
}

async function seedUsers() {
	try {
		await upsertData("users", users, async (user) => {
			await prisma.user.upsert({
				create: user,
				update: user,
				where: { id: user.id },
			});
		});
	} catch (error) {
		console.error("Error seeding users:", error);
	}
}

/**
 * Seeds the database with semesters data by upserting each semester.
 * Utilizes the provided upsertData utility function to handle bulk operations.
 */
async function seedSemesters() {
	try {
		await upsertData("semesters", semesters, async (semester) => {
			await prisma.semester.upsert({
				create: { ...semester, id: undefined },
				update: { ...semester, id: undefined },
				where: { id: semester.id },
			});
		});
	} catch (error) {
		console.error("Error seeding semesters:", error);
	}
}

/**
 * Seeds the database with project data by upserting each project.
 * Utilizes the provided upsertData utility function to handle bulk operations efficiently.
 * Each project is associated with an existing semester and one or more students.
 * The function creates all associated students and oscs if they do not exist.
 */
const seedProjects = async () => {
	try {
		await upsertData("projects", projects, async (project) => {
			await prisma.project.upsert({
				create: {
					...project,
					osc: {
						create: {
							name: project.osc.name,
							address: { create: { ...project.osc.address } },
						},
					},
					students: project?.students
						? {
								createMany: {
									data: (project?.students as Student[]).map((student) => ({
										name: student.name,
										whatsapp: student.whatsapp,
										courseId: 1,
									})),
								},
							}
						: {},
					semester: {
						connect: { name: "2024.2" },
					},
					id: undefined,
				},
				update: {
					...project,
					osc: { create: { name: project.osc.name } },
					students: project?.students
						? {
								createMany: {
									data: (project.students as Student[]).map((student) => ({
										name: student.name,
										courseId: 1,
									})),
								},
							}
						: {},
					semester: {
						connect: { name: "2024.2" },
					},
					id: undefined,
				},
				where: { id: project.id },
			});
		});
	} catch (error) {
		console.error("Error seeding projects:", error);
	}
};

// Seeds the database with survey data by upserting surveys and creating associated questions.
// This function ensures that surveys are upserted into the database. For each survey, it creates
// associated questions in the specified order. Each question may include multiple choice and checkbox
// options, which are also created and sorted by order. The function utilizes the upsertData utility
// to handle bulk operations efficiently.
async function seedSurveys() {
	try {
		await upsertData("surveys", surveys, async (survey) => {
			await prisma.survey.upsert({
				create: { ...survey, questions: undefined, id: undefined },
				update: { ...survey, questions: undefined, id: undefined },
				where: { id: survey.id },
			});

			await Promise.all(
				survey.questions.create
					.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
					.map(async (question: any) => {
						await prisma.question.create({
							data: {
								...question,
								id: undefined,
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
	} catch (error) {
		console.error("Error seeding surveys:", error);
	}
}

async function seedSurveyAnswers() {
	const oscs = await prisma.oSC.findMany({
		where: {
			name: { in: surveyAnswers.map((answer) => answer.osc) },
		},
	});

	const finalSurveyAnswers = surveyAnswers.map((answer) => ({
		...answer,
		osc: oscs.find((osc) => osc.name === answer.osc),
	}));

	const questions = await prisma.question.findMany({
		where: {
			survey: { id: 1 },
		},
	});

	await upsertData(
		"surveyAnswers",
		finalSurveyAnswers,
		async (surveyAnswer) => {
			await prisma.surveyAnswer.upsert({
				create: {
					osc: { connect: { id: surveyAnswer?.osc?.id } },
					createdAt: surveyAnswer.createdAt,
					responses: {
						createMany: {
							data: surveyAnswer.responses.create
								?.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
								.map((response: any) => ({
									questionId:
										questions.find(
											(question) => question.name === response.questionName,
										)?.id ?? 0,
									answer: response.answer ?? "",
								})),
						},
					},
					survey: { connect: { id: 1 } },
					id: undefined,
				},
				update: {
					...surveyAnswer,
					osc: { connect: { id: surveyAnswer.osc?.id } },
					responses: {
						createMany: {
							data: surveyAnswer.responses.create
								?.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
								.map((response: any) => ({
									questionId:
										questions.find(
											(question) => question.name === response.questionName,
										)?.id ?? 0,
									answer: response.answer ?? "",
								})),
						},
					},
					survey: { connect: { id: 1 } },
					id: undefined,
				},
				where: { id: surveyAnswer.id },
			});
		},
	);
}

/**
 * Seeds the database with initial data.
 *
 * This function is called by the `seed` script in `package.json`, and is used
 * to populate the database with some initial data. This is useful for testing
 * and development purposes.
 *
 * The function will log a message to the console when it starts and when it
 * finishes, and will exit the process with a non-zero exit code if it
 * encounters an error.
 *
 * The function will disconnect from the database once it's finished, to ensure
 * that the connection is closed properly.
 */
async function seed() {
	try {
		console.log("Starting the seeding process...");
		await seedSocials();
		await seedSemesters();
		await seedCourses();
		await seedProjects();
		await seedUsers();
		await seedSurveys();
		await seedSurveyAnswers();
	} catch (e) {
		console.error(e);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

seed();
