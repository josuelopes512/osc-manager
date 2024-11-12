import { faker } from "@faker-js/faker";
import type { OSC } from "@prisma/client";
import { prisma } from "../prisma/prisma.config";

const generateFakeOSC = async (count: number) => {
	for (let i = 0; i < count; i++) {
		const fakeData = {
			name: faker.company.name(),
			location: faker.location.streetAddress(),
			oscSocials: {
				create: [
					{
						socialPlatformId: 1,
						link: faker.internet.url(),
					},
					{
						socialPlatformId: 2,
						link: faker.internet.url(),
					},
				],
			},
		} as OSC & {
			oscSocials: { create: { socialPlatformId: number; link: string }[] };
		};
		await prisma.oSC.create({
			data: fakeData,
		});
		console.log(`Generated fake OSC ${i + 1}: ${fakeData.name}`);
	}
};

export default generateFakeOSC;
