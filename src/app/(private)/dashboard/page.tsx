"use client";

import { Select, SelectItem } from "@nextui-org/react";
import SurveyCharts from "./surveyGraph";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/functions.api";
import type { Survey } from "@prisma/client";

export default function Home() {
	const {
		data: dataSurvey,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["survey-get"],
		queryFn: ({ signal }) =>
			getData<Survey[]>({
				url: "/survey",
				signal,
			}),
	});
	const data = {
		questions: [
			{
				question: "Qual é o seu papel no processo de colaboração com OSCs?",
				answers: {
					labels: ["Aluno", "Representante de OSC", "Professor"],
					values: [50, 30, 20], // Respostas simuladas
				},
			},
			{
				question:
					"Como você descreveria sua experiência geral de trabalho com a OSC?",
				answers: {
					labels: [
						"Muito positiva",
						"Positiva",
						"Neutra",
						"Negativa",
						"Muito negativa",
					],
					values: [40, 35, 15, 5, 5],
				},
			},
		],
	};

	const isGoogleForms = process.env.NEXT_PUBLIC_GRAPH_GOOGLE_FORMS === "true";

	console.log("isGoogleForms", isGoogleForms);

	return (
		<div className="flex flex-col justify-between w-full">
			<h1 className="text-3xl font-bold mt-2 mb-4">Dashboard</h1>
			<Select
				items={dataSurvey ?? []}
				label="Questionário"
				placeholder="Selecione um questionário"
				className="max-w-xs mb-2"
			>
				{(survey) => (
					<SelectItem key={survey.id} value={survey.id}>
						{survey.name}
					</SelectItem>
				)}
			</Select>
			{!isGoogleForms && <SurveyCharts surveyData={data} />}
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
