import { prisma } from "@/app/api/prisma/prisma.config";

const courses = [
	{ id: 1, name: "Administração" },
	{ id: 2, name: "Análise e Desenvolvimento de Sistemas" },
	{ id: 3, name: "Arquitetura e Urbanismo" },
	{ id: 4, name: "Biomedicina" },
	{ id: 5, name: "Business Agility" },
	{ id: 6, name: "Ciência da Computação" },
	{ id: 7, name: "Ciência da Felicidade, Trabalho e Produtividade" },
	{ id: 8, name: "Ciências Contábeis" },
	{ id: 9, name: "Construção de Edifícios" },
	{ id: 10, name: "Cuidados Paliativos Multiprofissionais" },
	{ id: 11, name: "Design de Interiores" },
	{ id: 12, name: "Direito" },
	{ id: 13, name: "Direito" },
	{ id: 14, name: "Direito Sindical" },
	{ id: 15, name: "Enfermagem" },
	{ id: 16, name: "Engenharia Ambiental e Sanitária" },
	{ id: 17, name: "Engenharia Civil" },
	{ id: 18, name: "Engenharia de Produção" },
	{ id: 19, name: "Engenharia Elétrica" },
	{ id: 20, name: "Engenharia Mecânica" },
	{ id: 21, name: "Especialização em Licitações e Contratações Públicas" },
	{ id: 22, name: "Especialização em Psicodrama" },
	{ id: 23, name: "Especialização em Teoria Psicanalítica" },
	{ id: 24, name: "Fisioterapia" },
	{ id: 25, name: "Gerenciamento de Projetos e Processos" },
	{ id: 26, name: "Gestão da Tecnologia da Informação" },
	{ id: 27, name: "Gestão de Recursos Humanos" },
	{ id: 28, name: "Gestão Financeira" },
	{ id: 29, name: "Intervenções em Situações de Perdas e Luto" },
	{ id: 30, name: "Jogos Digitais" },
	{ id: 31, name: "Marketing" },
	{ id: 32, name: "Marketing (Tecnólogo)" },
	{ id: 33, name: "Nutrição" },
	{ id: 34, name: "Pedagogia" },
	{ id: 35, name: "Processos Gerenciais" },
	{ id: 36, name: "Psicologia" },
];

const socialMediaPlatforms = [
	{ id: 1, name: "Facebook" },
	{ id: 2, name: "Instagram" },
	{ id: 3, name: "Twitter" },
	{ id: 4, name: "LinkedIn" },
	{ id: 5, name: "YouTube" },
	{ id: 6, name: "Pinterest" },
	{ id: 7, name: "Snapchat" },
	{ id: 8, name: "TikTok" },
	{ id: 9, name: "Reddit" },
	{ id: 10, name: "Tumblr" },
];

const users = [
	{
		id: 1,
		name: "Levi Gleik",
		email: "leviacedo1@gmail.com",
	},
	{
		id: 2,
		name: "Josué Lopes",
		email: "cmastercode77@gmail.com",
	},
];

const semesters = [
	{ id: 1, name: "2021.1" },
	{ id: 2, name: "2021.2" },
	{ id: 3, name: "2022.1" },
	{ id: 4, name: "2022.2" },
	{ id: 5, name: "2023.1" },
	{ id: 6, name: "2023.2" },
	{ id: 7, name: "2024.1" },
	{ id: 8, name: "2024.2" },
	{ id: 9, name: "2025.1" },
	{ id: 10, name: "2025.2" },
	{ id: 11, name: "2026.1" },
	{ id: 12, name: "2026.2" },
	{ id: 13, name: "2027.1" },
	{ id: 14, name: "2027.2" },
	{ id: 15, name: "2028.1" },
	{ id: 16, name: "2028.2" },
	{ id: 17, name: "2029.1" },
	{ id: 18, name: "2029.2" },
	{ id: 19, name: "2030.1" },
	{ id: 20, name: "2030.2" },
	{ id: 21, name: "2031.1" },
	{ id: 22, name: "2031.2" },
	{ id: 23, name: "2032.1" },
	{ id: 24, name: "2032.2" },
	{ id: 25, name: "2033.1" },
	{ id: 26, name: "2033.2" },
	{ id: 27, name: "2034.1" },
	{ id: 28, name: "2034.2" },
];

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

async function seed() {
	try {
		console.log("Starting the seeding process...");
		await seedSocials();
		await seedCourses();
		await seedUsers();
		await seedSemesters();
	} catch (e) {
		console.error(e);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

seed();
