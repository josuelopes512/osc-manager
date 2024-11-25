"use client";

import { Pie, Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
} from "chart.js";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
);

const SurveyCharts = ({ surveyData }: any) => {
	// Dados para o gráfico de pizza
	const pieData = {
		labels: surveyData.questions[0].answers.labels,
		datasets: [
			{
				data: surveyData.questions[0].answers.values,
				backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
				hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
			},
		],
	};

	// Dados para o gráfico de colunas
	const barData = {
		labels: surveyData.questions[1].answers.labels,
		datasets: [
			{
				label: "Respostas",
				data: surveyData.questions[1].answers.values,
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
			},
		],
	};

	// Configurações para o gráfico de colunas
	const barOptions = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: "top",
			},
			title: {
				display: true,
				text: surveyData.questions[1].question,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	return (
		<div>
			<h1>{surveyData.name}</h1>
			<p>{surveyData.description}</p>

			{/* Container flexível para os gráficos */}
			<div
				style={{
				display: "flex", 
				justifyContent: "center", 
				alignItems: "flex-start", 
				gap: "150px", 
				flexWrap: "wrap", 
				}}
			>
				<div style={{ maxWidth: "400px" }}>
					<h2>{surveyData.questions[0].question}</h2>
					<Pie data={pieData} />
				</div>

				<div style={{ maxWidth: "450px" }}>
					<h2>{surveyData.questions[1].question}</h2>
					<Bar data={barData} options={barOptions as any} />
				</div>
			</div>
		</div>
	);
};

export default SurveyCharts;
