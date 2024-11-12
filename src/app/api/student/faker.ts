import { faker } from "@faker-js/faker";
import type { Student } from "@prisma/client";
import { prisma } from "../prisma/prisma.config";

const generateFakeStudent = async (count: number) => {
	for (let i = 0; i < count; i++) {
		const fakeData = {
			name: faker.person.fullName(),
			email: faker.internet.email(),
			whatsapp: faker.phone.number(),
			matriculation: String(faker.number.int({ min: 1000000, max: 9999999 })),
			course: {
				create: {
					name: faker.company.name(),
				},
			},
		};
		await prisma.student.create({
			data: fakeData,
		});
		console.log(`Generated fake Student ${i + 1}: ${fakeData.name}`);
	}
};

export default generateFakeStudent;
