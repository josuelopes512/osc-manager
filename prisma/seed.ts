import { prisma } from "@/app/api/prisma/prisma.config";

const courses = [
	"Administração",
	"Análise e Desenvolvimento de Sistemas",
	"Arquitetura e Urbanismo",
	"Biomedicina",
	"Business Agility",
	"Ciência da Computação",
	"Ciência da Felicidade, Trabalho e Produtividade",
	"Ciências Contábeis",
	"Construção de Edifícios",
	"Cuidados Paliativos Multiprofissionais",
	"Design de Interiores",
	"Direito",
	"Direito",
	"Direito Sindical",
	"Enfermagem",
	"Engenharia Ambiental e Sanitária",
	"Engenharia Civil",
	"Engenharia de Produção",
	"Engenharia Elétrica",
	"Engenharia Mecânica",
	"Especialização em Licitações e Contratações Públicas",
	"Especialização em Psicodrama",
	"Especialização em Teoria Psicanalítica",
	"Fisioterapia",
	"Gerenciamento de Projetos e Processos",
	"Gestão da Tecnologia da Informação",
	"Gestão de Recursos Humanos",
	"Gestão Financeira",
	"Intervenções em Situações de Perdas e Luto",
	"Jogos Digitais",
	"Marketing",
	"Marketing (Tecnólogo)",
	"Nutrição",
	"Pedagogia",
	"Processos Gerenciais",
	"Psicologia",
];

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
		await prisma.socialPlatform.create({
			data: {
				name: social.name,
			},
		});
	}
	console.log("Social media platforms seeded.");
}

async function seedCourses() {
	console.log("Seeding courses...");
	for (const course of courses) {
		await prisma.course.create({
			data: {
				name: course,
			},
		});
	}
	console.log("Courses seeded.");
}

async function seed() {
	try {
		console.log("Starting the seeding process...");
		await seedSocials(); // Call the new function to seed social media platforms
		await seedCourses();
	} catch (e) {
		console.error(e);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

seed();
