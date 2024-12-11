import type { SurveAnswersDashboard } from "@/app/api/survey/[id]/answers/route";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as XLSX from "xlsx";

export const handleExportToCSV = (
	surveyAnswers: SurveAnswersDashboard,
	surveyName?: string,
) => {
	if (!surveyAnswers || !surveyAnswers.questions.length) {
		return;
	}

	// Criar os cabeçalhos
	const questionHeaders = surveyAnswers.questions.map((q) => q.question);
	const headers = [
		"Data/Hora",
		"Nome da Instituição",
		// "Nome do Aluno",
		...questionHeaders,
	];

	// Mapear os dados para as colunas apropriadas
	const data = surveyAnswers.surveysAnswers.map((surveyAnswer) => {
		const baseData = {
			"Data/Hora": format(surveyAnswer.createdAt, "dd/MM/yyyy HH:mm", {
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

	// Criar uma nova planilha
	const worksheet = XLSX.utils.json_to_sheet(data);
	const workbook = XLSX.utils.book_new();

	// Definir estilo para cabeçalhos
	const headerStyle = { font: { bold: true } };
	headers.forEach((header, index) => {
		worksheet[`${String.fromCharCode(65 + index)}1`].s = headerStyle; // A1, B1, C1, etc.
	});

	// Calcular larguras máximas das colunas
	const getMaxWidth = (data: any[], headers: string[]) => {
		const widths = headers.map((header) => header.length); // Largura dos cabeçalhos
		data.forEach((row) => {
			headers.forEach((header, index) => {
				const cellValue = String(row[header]); // Garantir que o valor é uma string
				widths[index] = Math.max(widths[index], cellValue.length);
			});
		});
		return widths.map((width) => ({ wpx: width * 10 })); // Multiplicar por 10 para ajustar a largura
	};

	// Definir larguras das colunas dinamicamente
	worksheet["!cols"] = getMaxWidth(data, headers);

	XLSX.utils.book_append_sheet(workbook, worksheet, "Respostas");

	XLSX.writeFile(
		workbook,
		`Relatório${surveyName ? `-${surveyName}` : ""}.xlsx`,
	);
};
