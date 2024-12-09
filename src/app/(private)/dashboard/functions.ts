import type { SurveAnswersDashboard } from "@/app/api/survey/[id]/answers/route";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const handleExportToCSV = (
	surveyAnswers: SurveAnswersDashboard,
	selectedSurveyId: string,
) => {
	if (!surveyAnswers || !surveyAnswers.questions.length) {
		return;
	}

	// Criar os cabeçalhos
	const questionHeaders = surveyAnswers.questions.map((q) => q.question);
	const headers = [
		"data",
		"Nome da Instituição",
		// "Nome do Aluno",
		...questionHeaders,
	];

	// Mapear os dados para as colunas apropriadas
	const data = surveyAnswers.surveysAnswers.map((surveyAnswer) => {
		const baseData = {
			data: format(surveyAnswer.createdAt, "dd/MM/yyyy HH:mm", {
				locale: ptBR,
			}),
			"Nome da Instituição": surveyAnswer.osc?.name ?? "",
			// "Nome do Aluno": surveyAnswer.student?.name ?? "",
		};

		// Preencher respostas das perguntas
		const answers = surveyAnswers.questions.map((question) => {
			const response = surveyAnswer.responses.find(
				(res) => res.question.name === question.question,
			);
			if (response?.question.type === "CheckBox") {
				const parsedAnswer = JSON.parse(response?.answer);
				if (parsedAnswer?.includes("Outro")) return response?.other;
				return parsedAnswer.join("/ ");
			}
			if (response?.question.type === "MultipleChoice") {
				if (response?.answer === "Outro") return response?.other;
			}
			return response?.answer ?? ""; // Caso não haja resposta
		});

		return {
			...baseData,
			...Object.fromEntries(questionHeaders.map((q, i) => [q, answers[i]])),
		};
	});

	// Função para encapsular valores com aspas quando necessário
	const escapeCSVValue = (value: string) => {
		if (
			typeof value === "string" &&
			(value.includes(",") || value.includes('"'))
		) {
			return `"${value.replace(/"/g, '""')}"`; // Escapar aspas duplas dentro do valor
		}
		return value;
	};

	// Converter os dados em formato CSV
	const csvData = [
		headers
			.map(escapeCSVValue)
			.join(","), // Cabeçalhos
		...data.map((surveyAnswer) =>
			headers
				.map((header) =>
					escapeCSVValue(
						surveyAnswer[header as keyof typeof surveyAnswer] ?? "",
					),
				)
				.join(","),
		),
	].join("\n");

	// Criar o arquivo CSV
	const blob = new Blob([csvData], { type: "text/csv" });
	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = `survey-answers-${selectedSurveyId}.csv`;
	a.click();
	a.remove();
};
