"use client";

import SurveyCharts from "./surveyGraph";

export default function Home() {
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

	return (
		<div className="flex items-center justify-center w-full">
			<SurveyCharts surveyData={data} />
			{/* <iframe
				title="Google Sheets"
				className="w-[1435px] overflow-x-hidden h-screen border-0 bg-black"
				allowFullScreen
				width={640}
				height={1705}
				src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTYeey6PnXWMDA_VPlarT6dJ6t_BYKA6cbd7RxY6lXaJgkET_2Y7vaiN1EOAOoB-p8XJppZ2_aWoRAZ/pubhtml?gid=179606886&amp;single=true&amp;widget=true&amp;headers=false"
			/> */}
		</div>
	);
}
