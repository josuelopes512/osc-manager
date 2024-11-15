import { prisma } from "@/app/api/prisma/prisma.config";
import {
	courses,
	projects,
	semesters,
	socialMediaPlatforms,
	users,
} from "./contants";

async function seedSocials() {
	console.log("Seeding social media platforms...");
	for (const social of socialMediaPlatforms) {
		await prisma.socialPlatform.upsert({
			create: social,
			update: social,
			where: {
				id: social.id,
			},
		});
	}
	console.log("Social media platforms seeded.");
}

async function seedCourses() {
	console.log("Seeding courses...");
	for (const course of courses) {
		await prisma.course.upsert({
			create: course,
			update: course,
			where: { id: course.id },
		});
	}
	console.log("Courses seeded.");
}

async function seedUsers() {
	console.log("Seeding users...");
	for (const user of users) {
		await prisma.user.upsert({
			create: user,
			update: user,
			where: { id: user.id },
		});
	}
	console.log("Users seeded.");
}

async function seedSemesters() {
	console.log("Seeding semesters...");
	for (const semester of semesters) {
		await prisma.semester.upsert({
			create: semester,
			update: semester,
			where: { id: semester.id },
		});
	}
	console.log("Semesters seeded.");
}

const seedProjects = async () => {
	console.log("Seeding projects...");
	for (const project of projects) {
		await prisma.project.upsert({
			create: {
				...project,
				osc: { create: { name: project.osc.name } },
				students: {
					createMany: {
						data: project.students.map((student) => ({
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
			update: {
				...project,
				osc: { create: { name: project.osc.name } },
				students: {
					createMany: {
						data: project.students.map((student) => ({
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
	}
	console.log("Projects seeded.");
};

async function seed() {
	try {
		console.log("Starting the seeding process...");
		await seedSocials();
		await seedCourses();
		await seedUsers();
		await seedSemesters();
		await seedProjects();
	} catch (e) {
		console.error(e);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

seed();
