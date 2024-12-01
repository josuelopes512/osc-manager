const surveyAluno = {
	id: 1,
	name: "Colaboração Acadêmica com Organizações da Sociedade Civil (Aluno)",
	description:
		"Este questionário tem como objetivo coletar dados sobre a organização e a execução de trabalhos acadêmicos realizados por alunos em parceria com Organizações da Sociedade Civil (OSCs). Sua participação é voluntária e confidencial. As informações coletadas serão utilizadas exclusivamente para fins acadêmicos.",
	questions: {
		create: [
			{
				name: "Por quanto tempo você esteve envolvido em trabalhos acadêmicos com OSCs?",
				order: 0,
				type: "MultipleChoice",
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
				type: "MultipleChoice",
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
				type: "MultipleChoice",
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
				name: "Por quanto tempo você esteve envolvido em trabalhos acadêmicos com OSCs?",
				order: 3,
				type: "MultipleChoice",
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
				order: 4,
				type: "MultipleChoice",
				required: true,
				multipleChoice: [
					{ choice: "1", order: 1 },
					{ choice: "2 a 5", order: 2 },
					{ choice: "Mais de 5", order: 3 },
					{ choice: "Não se aplica", order: 4 },
				],
			},
			{
				name: "Quais foram as principais dificuldades que você enfrentou na execução do trabalho acadêmico com a OSC?",
				order: 5,
				type: "CheckBox",
				required: true,
				checkBox: [
					{ option: "Falta de clareza nas expectativas da OSC", order: 1 },
					{
						option: "Dificuldade em aplicar conceitos teóricos à prática",
						order: 2,
					},
					{ option: "Falta de tempo para desenvolver o projeto", order: 3 },
					{
						option: "Limitações de recursos (financeiros, materiais)",
						order: 4,
					},
					{ option: "Falta de orientação adequada", order: 5 },
					{ option: "Nenhuma", order: 6 },
					{ option: "Outro", order: 7 },
				],
			},
			{
				name: "Como você descreveria sua experiência geral de trabalho com a OSC?",
				order: 6,
				type: "MultipleChoice",
				required: true,
				multipleChoice: [
					{ choice: "Muito positiva", order: 1 },
					{ choice: "Positiva", order: 2 },
					{ choice: "Neutra", order: 3 },
					{ choice: "Negativa", order: 4 },
					{ choice: "Muito negativa", order: 5 },
				],
			},
			{
				name: "Em que medida você acredita que o trabalho acadêmico contribuiu para o seu aprendizado prático?",
				order: 7,
				type: "MultipleChoice",
				required: true,
				multipleChoice: [
					{ choice: "Contribuiu muito", order: 1 },
					{ choice: "Contribuiu moderadamente", order: 2 },
					{ choice: "Contribuiu pouco", order: 3 },
					{ choice: "Não contribuiu", order: 4 },
				],
			},
			{
				name: "Você sentiu que o trabalho final atendeu às expectativas da OSC?",
				order: 8,
				type: "MultipleChoice",
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
				order: 9,
				type: "ShortAnswer",
				required: true,
			},
		],
	},
};

const surveysRepresentantes = {
	id: 2,
	name: "Colaboração Acadêmica com Organizações da Sociedade Civil (Representantes)",
	description:
		"Este questionário tem como objetivo coletar dados sobre a organização e a execução de trabalhos acadêmicos realizados por alunos em parceria com Organizações da Sociedade Civil (OSCs). Sua participação é voluntária e confidencial. As informações coletadas serão utilizadas exclusivamente para fins acadêmicos.",
	questions: {
		create: [
			{
				name: "Por quanto tempo você esteve envolvido em trabalhos acadêmicos com OSCs?",
				order: 0,
				type: "MultipleChoice",
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
				type: "MultipleChoice",
				required: true,
				multipleChoice: [
					{ choice: "1", order: 1 },
					{ choice: "2 a 5", order: 2 },
					{ choice: "Mais de 5", order: 3 },
					{ choice: "Não se aplica", order: 4 },
				],
			},
			{
				name: "Como você organiza a execução de trabalhos acadêmicos em parceria com OSCs?",
				order: 2,
				type: "MultipleChoice",
				required: true,
				multipleChoice: [
					{
						choice: "De maneira informal (sem processos estabelecidos)",
						order: 1,
					},
					{
						choice: "Com um processo estruturado e claro para alunos e OSCs",
						order: 2,
					},
					{ choice: "Other", order: 3 },
				],
			},
			{
				name: "Quais são os maiores desafios que você observa na realização desses trabalhos?",
				order: 3,
				type: "CheckBox",
				required: true,
				checkBox: [
					{
						option: "Falta de alinhamento entre expectativas de OSCs e alunos",
						order: 1,
					},
					{
						option: "Dificuldade dos alunos em aplicar a teoria na prática",
						order: 2,
					},
					{
						option: "Limitações de tempo e recursos para orientar os alunos",
						order: 3,
					},
					{ option: "Falta de feedback contínuo das OSCs", order: 4 },
					{ option: "Nenhuma", order: 5 },
					{ option: "Outros", order: 6 },
				],
			},
			{
				name: "Você acredita que os trabalhos acadêmicos realizados atendem às demandas das OSCs?",
				order: 4,
				type: "MultipleChoice",
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
				order: 5,
				type: "MultipleChoice",
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
				order: 6,
				type: "ShortAnswer",
				required: true,
			},
		],
	},
};

const surveysProfessores = {
	id: 3,
	name: "Colaboração Acadêmica com Organizações da Sociedade Civil (Professores/Coordenador de curso)",
	description:
		"Este questionário tem como objetivo coletar dados sobre a organização e a execução de trabalhos acadêmicos realizados por alunos em parceria com Organizações da Sociedade Civil (OSCs). Sua participação é voluntária e confidencial. As informações coletadas serão utilizadas exclusivamente para fins acadêmicos.",
	questions: {
		create: [
			{
				name: "Por quanto tempo você esteve envolvido em trabalhos acadêmicos com OSCs?",
				order: 0,
				type: "MultipleChoice",
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
				type: "MultipleChoice",
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
				type: "MultipleChoice",
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
				name: "Os resultados entregues pelos alunos atenderam às necessidades e expectativas da sua organização?",
				order: 3,
				type: "MultipleChoice",
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
				order: 4,
				type: "CheckBox",
				required: true,
				checkBox: [
					{ option: "Falta de clareza nas expectativas dos alunos", order: 1 },
					{
						option: "Prazos incompatíveis com as necessidades da OSC",
						order: 2,
					},
					{ option: "Dificuldade na comunicação entre OSC e alunos", order: 3 },
					{ option: "Resultados teóricos que não são aplicáveis", order: 4 },
					{ option: "Nenhuma", order: 5 },
					{ option: "Other", order: 6 },
				],
			},
			{
				name: "Qual foi o impacto prático dos trabalhos acadêmicos na OSC?",
				order: 5,
				type: "MultipleChoice",
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
				order: 6,
				type: "ShortAnswer",
				required: true,
			},
		],
	},
};

export const surveys = [surveyAluno, surveysRepresentantes, surveysProfessores];
