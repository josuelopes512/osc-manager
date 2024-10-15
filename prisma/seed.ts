import { prisma } from "@/app/api/prisma/prisma.config";

const socialMediaPlatforms = [
	{ name: "Facebook" },
	{ name: "Instagram" },
	{ name: "Twitter" },
	{ name: "LinkedIn" },
	{ name: "YouTube" },
	{ name: "Pinterest" },
	{ name: "Snapchat" },
	{ name: "TikTok" },
	{ name: "Reddit" },
	{ name: "Tumblr" },
];
async function seedSocials() {
	console.log("Seeding social media platforms...");
	for (const social of socialMediaPlatforms) {
		await prisma.social.create({
			data: {
				name: social.name,
			},
		});
	}
	console.log("Social media platforms seeded.");
}

async function seed() {
	try {
		console.log("Starting the seeding process...");
		await seedSocials(); // Call the new function to seed social media platforms
	} catch (e) {
		console.error(e);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

seed();
