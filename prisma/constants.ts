import { QuestionType } from "@prisma/client";

export const courses = [
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
	{ id: 13, name: "Direito Sindical" },
	{ id: 14, name: "Enfermagem" },
	{ id: 15, name: "Engenharia Ambiental e Sanitária" },
	{ id: 16, name: "Engenharia Civil" },
	{ id: 17, name: "Engenharia de Produção" },
	{ id: 18, name: "Engenharia Elétrica" },
	{ id: 19, name: "Engenharia Mecânica" },
	{ id: 20, name: "Especialização em Licitações e Contratações Públicas" },
	{ id: 21, name: "Especialização em Psicodrama" },
	{ id: 22, name: "Especialização em Teoria Psicanalítica" },
	{ id: 23, name: "Fisioterapia" },
	{ id: 24, name: "Gerenciamento de Projetos e Processos" },
	{ id: 25, name: "Gestão da Tecnologia da Informação" },
	{ id: 26, name: "Gestão de Recursos Humanos" },
	{ id: 27, name: "Gestão Financeira" },
	{ id: 28, name: "Intervenções em Situações de Perdas e Luto" },
	{ id: 29, name: "Jogos Digitais" },
	{ id: 30, name: "Marketing" },
	{ id: 31, name: "Marketing (Tecnólogo)" },
	{ id: 32, name: "Nutrição" },
	{ id: 33, name: "Pedagogia" },
	{ id: 34, name: "Processos Gerenciais" },
	{ id: 35, name: "Psicologia" },
];

export const socialMediaPlatforms = [
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

export const projects = [
	{
		id: 1,
		name: "Instituto Vida Videira",
		osc: {
			name: "Instituto Vida Videira",
		},
		students: [{ name: "", whatsapp: "" }],
	},
	{
		id: 2,
		name: "FECARCE",
		osc: {
			name: "FECARCE",
		},
		students: [{ name: "", whatsapp: "" }],
	},
	{
		id: 3,
		name: "Instituto Maria do Carmo",
		osc: {
			name: "Instituto Maria do Carmo",
		},
		students: [{ name: "", whatsapp: "" }],
	},
	{
		id: 4,
		name: "Conselho Comunitário do Parque São José- CCPSJ",
		osc: {
			name: "CCPSJ",
		},
		students: [{ name: "", whatsapp: "" }],
	},
	{
		id: 5,
		name: "Mães da Resistência",
		osc: {
			name: "Mães da Resistência",
		},
		students: [{ name: "", whatsapp: "" }],
	},
	{
		id: 6,
		name: "Instituto Recomeçando",
		osc: {
			name: "Instituto Recomeçando",
		},
		students: [{ name: "", whatsapp: "" }],
	},
	{
		id: 7,
		name: "Saboaria Ecológica",
		osc: {
			name: "Saboaria Ecológica",
		},
		students: [{ name: "", whatsapp: "" }],
	},
	{
		id: 8,
		name: "APDCAI",
		osc: {
			name: "APDCAI",
		},
		students: [{ name: "", whatsapp: "" }],
	},
	{
		id: 9,
		name: "Caverna de Adulão",
		osc: {
			name: "Caverna de Adulão",
		},
		students: [{ name: "", whatsapp: "" }],
	},
	{
		id: 10,
		name: "Instituição Lucimario Caetano",
		osc: {
			name: "Instituição Lucimario Caetano",
		},
		students: [{ name: "", whatsapp: "" }],
	},
	{
		id: 11,
		name: "Lar Beneficente Cisco de Luz",
		osc: {
			name: "Lar Beneficente Cisco de Luz",
		},
		students: [{ name: "", whatsapp: "" }],
	},
	{
		id: 12,
		name: "Lar Francisco de Assis",
		osc: {
			name: "Lar Francisco de Assis",
		},
		students: [{ name: "", whatsapp: "" }],
	},
	{
		id: 13,
		name: "Instituto Benjamim Dias",
		osc: {
			name: "Instituto Benjamim Dias",
		},
		students: [{ name: "", whatsapp: "" }],
	},
	{
		id: 14,
		name: "Aera",
		osc: {
			name: "Aera",
		},
		students: [{ name: "", whatsapp: "" }],
	},
	{
		id: 15,
		name: "Espaço Cultura e Vida Dorotéias",
		osc: {
			name: "Espaço Cultura e Vida Dorotéias",
		},
		students: [{ name: "", whatsapp: "" }],
	},
	{
		id: 16,
		name: "Alimentarize",
		osc: {
			name: "Alimentarize",
		},
		students: [{ name: "", whatsapp: "" }],
	},
	{
		id: 17,
		name: "Mulheres do Brasil",
		osc: {
			name: "Mulheres do Brasil",
		},
		students: [{ name: "", whatsapp: "" }],
	},
];

export const users = [
	{
		id: "1",
		name: "Levi Gleik",
		email: "leviacedo1@gmail.com",
		approved: true,
	},
	{
		id: "2",
		name: "Josué Lopes",
		email: "cmastercode77@gmail.com",
		approved: true,
	},
	{
		id: "3",
		name: "Caio Portela",
		email: "ccarvalho451@gmail.com",
		approved: true,
	},
];

export const semesters = [
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

const surveyDefault = {
	id: 1,
	name: "Colaboração Acadêmica com Organizações da Sociedade Civil (Todos)",
	description:
		"Este questionário tem como objetivo coletar dados sobre a organização e a execução de trabalhos acadêmicos realizados por alunos em parceria com Organizações da Sociedade Civil (OSCs). Sua participação é voluntária e confidencial. As informações coletadas serão utilizadas exclusivamente para fins acadêmicos.",
	questions: {
		create: [
			{
				name: "Por quanto tempo você esteve envolvido em trabalhos acadêmicos com OSCs?",
				order: 0,
				type: "MULTIPLE_CHOICE",
				required: true,
				multipleChoice: [
					{ choice: "Menos de 6 meses", order: 1 },
					{ choice: "Entre 6 meses e 1 ano", order: 2 },
					{ choice: "Mais de 1 ano", order: 3 },
					{ choice: "Não se aplica", order: 4 },
				],
			},
			{
				name: "Quantos trabalhos acadêmicos em parceria com OSCs você já participou?",
				order: 1,
				type: "MULTIPLE_CHOICE",
				required: true,
				multipleChoice: [
					{ choice: "1", order: 1 },
					{ choice: "2 a 5", order: 2 },
					{ choice: "Mais de 5", order: 3 },
					{ choice: "Não se aplica", order: 4 },
				],
			},
			{
				name: "Como foi a experiência de receber trabalhos acadêmicos de alunos?",
				order: 2,
				type: "MULTIPLE_CHOICE",
				required: true,
				multipleChoice: [
					{ choice: "Muito satisfatória", order: 1 },
					{ choice: "Satisfatória", order: 2 },
					{ choice: "Neutra", order: 3 },
					{ choice: "Insatisfatória", order: 4 },
					{ choice: "Muito insatisfatória", order: 5 },
				],
			},
			{
				name: "Qual é o seu papel no processo de colaboração com OSCs?",
				order: 3,
				type: "MULTIPLE_CHOICE",
				required: true,
				multipleChoice: [
					{ choice: "Aluno", order: 1 },
					{ choice: "Representante de OSC", order: 2 },
					{ choice: "Professor/Coordenador de curso", order: 3 },
				],
			},
			{
				name: "Por quanto tempo você esteve envolvido em trabalhos acadêmicos com OSCs?",
				order: 4,
				type: "MULTIPLE_CHOICE",
				required: true,
				multipleChoice: [
					{ choice: "Menos de 6 meses", order: 1 },
					{ choice: "Entre 6 meses e 1 ano", order: 2 },
					{ choice: "Mais de 1 ano", order: 3 },
					{ choice: "Não se aplica", order: 4 },
				],
			},
			{
				name: "Quantos trabalhos acadêmicos em parceria com OSCs você já participou?",
				order: 5,
				type: "MULTIPLE_CHOICE",
				required: true,
				multipleChoice: [
					{ choice: "1", order: 1 },
					{ choice: "2 a 5", order: 2 },
					{ choice: "Mais de 5", order: 3 },
					{ choice: "Não se aplica", order: 4 },
				],
			}
		],
	},
};

const surveyAluno = {
	id: 2,
	name: "Colaboração Acadêmica com Organizações da Sociedade Civil (Aluno)",
	description:
		"Caso você seja aluno, por favor, responda às seguintes perguntas:",
	questions: {
		create: [
			{
				name: "Quais foram as principais dificuldades que você enfrentou na execução do trabalho acadêmico com a OSC?  ",
				order: 0,
				type: "CHECK_BOX",
				checkBox: [
					{ option: "Falta de clareza nas expectativas da OSC", order: 1 },
					{
						option: "Dificuldade em aplicar conceitos teóricos à prática",
						order: 0
					},
					{ option: "Falta de tempo para desenvolver o projeto", order: 3 },
					{
						option: "Falta de tempo para desenvolver o projeto",
						order: 1
					},
					{
						option: "Limitações de recursos (financeiros, materiais)",
						order: 2
					},
					{
						option: "Falta de orientação adequada",
						order: 3
					},
					{
						option: "Nenhuma",
						order: 4
					},
					{
						option: "Outros",
						order: 5
					},
				],
				required: true,
			},
			{
				name: "Como você descreveria sua experiência geral de trabalho com a OSC?",
				order: 1,
				type: "MULTIPLE_CHOICE",
				required: true,
				multipleChoice: [
					{ choice: "Muito Positiva", order: 1 },
					{ choice: "Positiva", order: 2 },
					{ choice: "Neutra", order: 3 },
					{ choice: "Negativa", order: 4 },
					{ choice: "Muito Negativa", order: 5 },
				],
			},
			{
				name: "Em que medida você acredita que o trabalho acadêmico contribuiu para o seu aprendizado prático?",
				order: 2,
				type: "MULTIPLE_CHOICE",
				required: true,
				multipleChoice: [
					{ choice: "Contribuiu muito", order: 1 },
					{ choice: "Contribuiu moderadamente", order: 2 },
					{ choice: "Contribuiu pouco", order: 3 },
					{ choice: "Não Contribuiu", order: 4 },
				],
			},
			{
				name: "Você sentiu que o trabalho final atendeu às expectativas da OSC?",
				order: 3,
				type: "MULTIPLE_CHOICE",
				required: true,
				multipleChoice: [
					{ choice: "Sim, completamente", order: 1 },
					{ choice: "Sim, parcialmente", order: 2 },
					{ choice: "Não", order: 3 },
					{ choice: "Não sei dizer", order: 4 },
				],
			},
			{
				name: "Quais mudanças você sugeriria para melhorar a organização desses trabalhos?",
				order: 10,
				type: "SHORT_ANSWER",
				required: true,
			},
		],
	},
};

const surveysRepresentantes = {
	id: 3,
	name: "Colaboração Acadêmica com Organizações da Sociedade Civil (Representantes)",
	description:
		"Caso você seja representante de uma OSC, por favor, responda às seguintes perguntas:",
	questions: {
		create: [
			{
				name: "Como foi a experiência de receber trabalhos acadêmicos de alunos?",
				order: 0,
				type: "MULTIPLE_CHOICE",
				required: true,
				multipleChoice: [
					{ choice: "Muito Satisfatória", order: 1 },
					{ choice: "Satisfatória", order: 2 },
					{ choice: "Neutra", order: 3 },
					{ choice: "Insatisfatória", order: 4 },
					{ choice: "Muito insatisfatória", order: 5 },
				],
			},
			{
				name: "Você sentiu que o trabalho final atendeu às expectativas da OSC?",
				order: 1,
				type: "MULTIPLE_CHOICE",
				required: true,
				multipleChoice: [
					{ choice: "Sim, completamente", order: 1 },
					{ choice: "Sim, parcialmente", order: 2 },
					{ choice: "Não", order: 3 },
					{ choice: "Não sei dizer", order: 4 },
				],
			},
			{
				name: "Quais foram os principais desafios ao trabalhar com alunos em projetos acadêmicos?",
				order: 2,
				type: "CHECK_BOX",
				checkBox: [
					{
						option: "Falta de clareza nas expectativas dos alunos",
						order: 0
					},
					{
						option: "Prazos incompatíveis com as necessidades da OSC",
						order: 1
			},
			{
						option: "Dificuldade na comunicação entre OSC e alunos",
						order: 2
					},
					{
						option: "Resultados teóricos que não são aplicáveis",
						order: 3
					},
					{
						option: "Nenhuma",
						order: 4
					},
					{
						option: "Outros",
						order: 5
					},
					{ choice: "Falta de feedback contínuo das OSCs", order: 4 },
					{ choice: "Nenhuma", order: 5 },
					{ choice: "Outros", order: 6 },
				],
			},
			{
				name: "Você acredita que os trabalhos acadêmicos realizados atendem às demandas das OSCs?",
				order: 4,
				type: QuestionType.MULTIPLE_CHOICE,
				required: true,
				multipleChoice: [
					{ choice: "Sim, plenamente", order: 1 },
					{ choice: "Sim, parcialmente", order: 2 },
					{ choice: "Não", order: 3 },
					{ choice: "Não sei dizer", order: 4 },
				],
			},
			{
				name: "Qual foi o impacto prático dos trabalhos acadêmicos na OSC?",
				order: 3,
				type: "MULTIPLE_CHOICE",
				required: true,
				multipleChoice: [
					{ choice: "Impacto significativo", order: 1 },
					{ choice: "Algum impacto", order: 2 },
					{ choice: "Pouco impacto", order: 3 },
					{ choice: "Nenhum impacto", order: 4 },
				],
			},
			{
				name: "Que melhorias poderiam ser implementadas para otimizar a colaboração com instituições de ensino?",
				order: 4,
				type: "SHORT_ANSWER",
				required: true,
			},
		],
	},
};

const surveysProfessores = {
	id: 4,
	name: "Colaboração Acadêmica com Organizações da Sociedade Civil (Professores/Coordenadores de Curso)",
	description:
		"Caso você seja professor ou coordenador, por favor, responda às seguintes perguntas:",
	questions: {
		create: [
			{
				name: "Como você organiza a execução de trabalhos acadêmicos em parceria com OSCs?",
				order: 0,
				type: "MULTIPLE_CHOICE",
				required: true,
				multipleChoice: [
					{ choice: "De maneira informal (sem processos estabelecidos)", order: 1 },
					{ choice: "Com um processo estruturado e claro para alunos e OSCs", order: 2 },
					{ choice: "Outros", order: 3 }
				],
			},
			{
				name: "Quais são os maiores desafios que você observa na realização desses trabalhos?",
				order: 1,
				type: "MULTIPLE_CHOICE",
				required: true,
				multipleChoice: [
					{ choice: "Falta de alinhamento entre expectativas de OSCs e alunos", order: 1 },
					{ choice: "Dificuldade dos alunos em aplicar a teoria na prática", order: 2 },
					{ choice: "Limitações de tempo e recursos para orientar os alunos", order: 3 },
					{ choice: "Falta de feedback contínuo das OSCs", order: 4 },
					{ choice: "Nenhuma", order: 5 },
					{ choice: "Outros", order: 6 },
				],
			},
			{
				name: "Você acredita que os trabalhos acadêmicos realizados atendem às demandas das OSCs?",
				order: 2,
				type: "MULTIPLE_CHOICE",
				required: true,
				multipleChoice: [
					{ choice: "Sim, plenamente", order: 1 },
					{ choice: "Sim, parcialmente", order: 2 },
					{ choice: "Não", order: 3 },
					{ choice: "Não sei dizer", order: 4 },
				],
			},
			{
				name: "Como você avalia a contribuição dos trabalhos acadêmicos para a formação prática dos alunos?",
				order: 3,
				type: "MULTIPLE_CHOICE",
				required: true,
				multipleChoice: [
					{ choice: "Contribuição significativa", order: 1 },
					{ choice: "Contribuição moderada", order: 2 },
					{ choice: "Pouca contribuição", order: 3 },
					{ choice: "Nenhuma contribuição", order: 4 },
				],
			},
			{
				name: "Que mudanças ou melhorias você sugeriria para organizar melhor esses trabalhos e maximizar seus resultados?",
				order: 4,
				type: "SHORT_ANSWER",
				required: true,
			},
		],
	},
};

export const surveys = [surveyDefault, surveyAluno, surveysRepresentantes, surveysProfessores];
