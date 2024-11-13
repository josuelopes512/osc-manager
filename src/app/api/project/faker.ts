import { faker } from "@faker-js/faker";
import type { Project } from "@prisma/client";
import { prisma } from "../prisma/prisma.config";

const generateFakeProject = async (count: number) => {
	for (let i = 0; i < count; i++) {
		const fakeData = {
			name: faker.person.fullName(),
			students: {
				createMany: {
					data: [
						{
							name: faker.person.fullName(),
							courseId: 1,
						},
						{
							name: faker.person.fullName(),
							courseId: 2,
						},
					],
				},
			},
			osc: {
				create: {
					name: faker.company.name(),
				},
			},
			semester: {
				create: {
					name: faker.date.month(),
				},
			},
		};
		await prisma.project.create({
			data: fakeData,
		});
		console.log(`Generated fake Project ${i + 1}: ${fakeData.name}`);
	}
};

export default generateFakeProject;
