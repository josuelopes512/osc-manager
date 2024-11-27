"use client";

import { Select, SelectItem } from "@nextui-org/react";
import SurveyCharts from "./chart";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/functions.api";
import { useState } from "react";
import type { SurveAnswersDashboard } from "@/app/api/survey/[id]/answers/route";
import Loading from "@/components/loading";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Home() {
	const [selectedSurveyId, setSelectedSurveyId] = useState<number | null>(null);

	const {
		data: dataSurvey,
		isLoading: isLoadingSurveys,
		error: surveysError,
	} = useQuery<{ id: number; description: string; name: string }[], Error>({
		queryKey: ["survey-list"],
		queryFn: ({ signal }) =>
			getData<{ id: number; description: string; name: string }[]>({
				url: "/survey",
				signal,
			}),
	});

	const {
		data: surveyAnswers,
		isLoading: isLoadingAnswers,
		error: answersError,
	} = useQuery<SurveAnswersDashboard, Error>({
		queryKey: ["survey-answers", selectedSurveyId],
		queryFn: ({ signal }) =>
			getData<SurveAnswersDashboard>({
				url: `/survey/${selectedSurveyId}/answers`,
				signal,
			}),
		enabled: !!selectedSurveyId,
	});

	if (isLoadingSurveys || isLoadingAnswers) {
		return <Loading />;
	}

	if (surveysError || answersError) {
		return (
			<div className="w-full flex items-center justify-center">
				<div className="flex items-center justify-center p-4 text-red-700 bg-red-100 border border-red-400 rounded-lg w-fit">
					<FaExclamationTriangle className="mr-2" />
					<span>Erro ao carregar os questionários</span>
				</div>
			</div>
		);
	}

	// const data = {
	// 	questions: [
	// 		{
	// 			question: "Qual é o seu papel no processo de colaboração com OSCs?",
	// 			answers: {
	// 				labels: ["Aluno", "Representante de OSC", "Professor"],
	// 				values: [50, 30, 20], // Respostas simuladas
	// 			},
	// 		},
	// 		{
	// 			question:
	// 				"Como você descreveria sua experiência geral de trabalho com a OSC?",
	// 			answers: {
	// 				labels: [
	// 					"Muito positiva",
	// 					"Positiva",
	// 					"Neutra",
	// 					"Negativa",
	// 					"Muito negativa",
	// 				],
	// 				values: [40, 35, 15, 5, 5],
	// 			},
	// 		},
	// 	],
	// };

	const isGoogleForms = process.env.NEXT_PUBLIC_GRAPH_GOOGLE_FORMS === "true";

	return (
		<div className="flex flex-col justify-between w-full">
			<h1 className="text-3xl font-bold mt-2 mb-4">Dashboard</h1>
			<Select
				items={dataSurvey ?? []}
				label="Questionário"
				placeholder="Selecione um questionário"
				className="max-w-xs mb-2"
				isDisabled={isLoadingSurveys || !!surveysError}
				onChange={(e) => {
					const value = e.target.value;
					setSelectedSurveyId(Number(value));
					console.log(`Selected survey: ${value}`);

					if (isGoogleForms) {
						setSelectedSurveyId(null);
					}
				}}
			>
				{(survey) => (
					<SelectItem key={survey.id} value={survey.id}>
						{survey.name}
					</SelectItem>
				)}
			</Select>

			{!isGoogleForms && surveyAnswers && (
				<div className="flex justify-center items-start gap-48 flex-wrap py-8">
					{surveyAnswers.questions.map((question) => (
						<SurveyCharts key={question.question} surveyData={question} />
					))}
				</div>
			)}
			{isGoogleForms && (
				<iframe
					title="Google Sheets"
					className="w-[1435px] overflow-x-hidden h-screen border-0 bg-black"
					allowFullScreen
					width={640}
					height={1705}
					src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTYeey6PnXWMDA_VPlarT6dJ6t_BYKA6cbd7RxY6lXaJgkET_2Y7vaiN1EOAOoB-p8XJppZ2_aWoRAZ/pubhtml?gid=179606886&amp;single=true&amp;widget=true&amp;headers=false"
				/>
			)}
		</div>
	);
}
