export const surveys = [
	{
		id: 1,
		name: "Pesquisa de Avaliação do Projeto e Solução Proposta",
		description: `Olá querido(a) gestor(a) precisamos muito da sua ajuda para podermos fazer o projeto OSC x FFB evoluir.
Sua opinião é de extrema importância e contamos com a sua colaboração.
O objetivo desta pesquisa é coletar informações tanto qualitativas quanto quantitativas sobre a condução do projeto, a solução proposta e a experiência geral dos gestores envolvidos.`,
		questions: {
			create: [
				{
					name: "Nome da pessoa responsável pelo preenchimento deste formulário",
					order: 0,
					type: "ShortAnswer",
					required: true,
				},
				{
					name: "Foi realizada reunião prévia com a equipe de alunos?",
					order: 1,
					type: "MultipleChoice",
					required: true,
					multipleChoice: [
						{ choice: "Sim", order: 1 },
						{ choice: "Não", order: 2 },
					],
				},
				{
					name: "Após essa reunião, foi tomada uma decisão clara sobre o problema a ser abordado no projeto?",
					order: 2,
					type: "MultipleChoice",
					required: true,
					multipleChoice: [
						{ choice: "Sim", order: 1 },
						{ choice: "Não", order: 2 },
						{ choice: "Parcialmente", order: 3 },
					],
				},
				{
					name: "A solução proposta foi decidida em conjunto com a Instituição?",
					order: 3,
					type: "MultipleChoice",
					required: true,
					multipleChoice: [
						{ choice: "Sim", order: 1 },
						{ choice: "Não", order: 2 },
						{ choice: "Parcialmente", order: 3 },
					],
				},
				{
					name: "Como você classifica a solução proposta em termos de praticidade e simplicidade de execução ou uso?",
					order: 4,
					type: "MultipleChoice",
					required: true,
					multipleChoice: [
						{ choice: "Muito prática e simples", order: 1 },
						{ choice: "Prática e simples", order: 2 },
						{ choice: "Parcialmente prática/simples", order: 3 },
						{ choice: "Difícil de executar", order: 4 },
						{ choice: "Muito difícil de executar", order: 5 },
					],
				},
				{
					name: "Em qual fase o projeto se encontra atualmente?",
					order: 5,
					type: "MultipleChoice",
					required: true,
					multipleChoice: [
						{ choice: "Planejamento", order: 1 },
						{ choice: "Implementação inicial", order: 2 },
						{ choice: "Execução intermediária", order: 3 },
						{ choice: "Conclusão", order: 4 },
					],
				},
				{
					name: "Como você avalia a troca de experiências entre a equipe da Instituição e a equipe do projeto?",
					order: 6,
					type: "MultipleChoice",
					required: true,
					multipleChoice: [
						{ choice: "Excelente", order: 1 },
						{ choice: "Boa", order: 2 },
						{ choice: "Regular", order: 3 },
						{ choice: "Fraca", order: 4 },
						{ choice: "Inexistente", order: 5 },
					],
				},
				{
					name: "De um modo geral, como você classifica a sua experiência com o projeto até o momento?",
					order: 7,
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
					name: "Quais os aprendizados para a Instituição até o momento?",
					order: 8,
					type: "ShortAnswer",
					required: true,
				},
				{
					name: "Comentários adicionais ou sugestões para melhorar o andamento do projeto",
					order: 9,
					type: "ShortAnswer",
					required: true,
				},
			],
		},
	},
];
