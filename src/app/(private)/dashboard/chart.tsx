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
	type ChartOptions,
	type ChartData,
} from "chart.js";
import type { SurveAnswersDashboard } from "@/app/api/survey/[id]/answers/route";
import { Button, Tooltip as NextUITooltip } from "@nextui-org/react";
import { FaChartBar, FaChartPie, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
);

const SurveyCharts = ({
	surveyData,
}: {
	surveyData: SurveAnswersDashboard["questions"][number];
}) => {
	const [isPie, setIsPie] = useState(surveyData.type === "MultipleChoice");

	const pieData = {
		labels: surveyData.answers.labels,
		datasets: [
			{
				label: "Respostas",
				data: surveyData.answers.values,
				backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
				hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
			},
		],
	} as any;

	// Dados para o gráfico de colunas
	const barData = {
		labels: surveyData.answers.labels,
		datasets: [
			{
				label: "Respostas",
				data: surveyData.answers.values,
				backgroundColor: ["rgba(75, 192, 192, 0.2)"],
				borderColor: ["rgba(75, 192, 192, 1)"],
				borderWidth: 1,
			},
		],
	} as ChartData<"bar", number[], string>;

	// Configurações para o gráfico de colunas
	const barOptions = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: "top",
			},
			tooltip: {
				callbacks: {
					label: (tooltipItem) => {
						const total = tooltipItem.dataset.data.reduce(
							(sum, value) => (sum as number) + (value as number),
							0,
						) as number;
						const currentValue = tooltipItem.raw as number;
						const percentage = ((currentValue / total) * 100).toFixed(2);
						return `${tooltipItem.label}: ${currentValue} (${percentage}%)`;
					},
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	} as ChartOptions<"bar">;

	// Configurações para o gráfico de pizza
	const pieOptions = {
		plugins: {
			tooltip: {
				callbacks: {
					label: (tooltipItem) => {
						const total = tooltipItem.dataset.data.reduce(
							(sum, value) => sum + value,
							0,
						);
						const currentValue = tooltipItem.raw as number;
						const percentage = ((currentValue / total) * 100).toFixed(2);
						return `${tooltipItem.label}: ${currentValue} (${percentage}%)`;
					},
				},
			},
		},
	} as ChartOptions<"pie">;

	return (
		<div className="max-w-[450px] h-full bg-content2 p-4 rounded-lg">
			<div className="flex justify-between items-center mb-2">
				<h2>{surveyData.question}</h2>
				<NextUITooltip
					content={isPie ? "Grafico em colunas" : "Grafico em pizza"}
					placement="bottom-end"
					color="secondary"
				>
					<Button
						isIconOnly
						size="sm"
						variant="light"
						color="default"
						radius="full"
						onClick={() => setIsPie(!isPie)}
					>
						{isPie ? <FaChartBar size={20} /> : <FaChartPie size={20} />}
					</Button>
				</NextUITooltip>
			</div>
			{isPie && <Pie data={pieData} options={pieOptions} />}
			{!isPie && <Bar data={pieData} options={barOptions} />}
		</div>
	);
};

export default SurveyCharts;
