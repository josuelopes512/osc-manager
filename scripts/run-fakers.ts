import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const apiDir = join(__dirname, "../src/app/api");

const runFakers = async (count: number) => {
	const folders = readdirSync(apiDir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	for (const folder of folders) {
		const fakerPath = join(apiDir, folder, "faker.ts");
		if (existsSync(fakerPath)) {
			try {
				const fakerModule = await import(fakerPath);
				if (typeof fakerModule.default === "function") {
					await fakerModule.default(count);
					console.log(`Ran faker for ${folder}`);
				} else {
					console.error(`No default function exported in ${fakerPath}`);
				}
			} catch (error) {
				console.error(`Failed to run faker for ${folder}:`, error);
			}
		} else {
			console.log(`No faker.ts found in ${folder}`);
		}
	}
};

const count = Number.parseInt(process.argv[2], 10) || 1;
runFakers(count);
