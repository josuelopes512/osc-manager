"use client";

import type { SurveAnswersDashboard } from "@/app/api/survey/[id]/answers/route";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Tooltip as NextUITooltip,
} from "@nextui-org/react";
import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	type ChartOptions,
	Legend,
	LinearScale,
	Tooltip,
} from "chart.js";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
	FaChartBar,
	FaChartPie,
	FaEllipsisVertical,
	FaEye,
} from "react-icons/fa6";

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
	answers,
}: {
	surveyData: SurveAnswersDashboard["questions"][number];
	answers: SurveAnswersDashboard;
}) => {
	const [isPie, setIsPie] = useState(surveyData.type === "MultipleChoice");

	const [detailsVisible, setDetailsVisible] = useState(false);

	const { theme } = useTheme();

	const data = {
		labels: surveyData.answers.labels,
		datasets: [
			{
				label: "Respostas",
				data: surveyData.answers.values,
				backgroundColor: [
					"#FF6384",
					"#36A2EB",
					"#216869",
					"#49a078",
					"#9cc5a1",
					"#dce1de",
					"#bbc5aa",
				],
				hoverBackgroundColor: [
					"#FF6384",
					"#36A2EB",
					"#216869",
					"#49a078",
					"#9cc5a1",
					"#dce1de",
					"#bbc5aa",
				],
			},
		],
	} as any;

	// Configurações para o gráfico de colunas
	const barOptions = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: "top",
				labels: { color: theme === "dark" ? "#fff" : "#000" },
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
			legend: {
				labels: { color: theme === "dark" ? "#fff" : "#000" },
			},
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
		<div className="md:max-w-[450px] max-w-[330px] print:max-w-[330px] h-full bg-content2 p-4 rounded-lg mt-6">
			<div className="flex justify-between items-center mb-2">
				<h2>{surveyData.question}</h2>
				<Dropdown>
					<DropdownTrigger className="print:hidden">
						<Button isIconOnly variant="flat" radius="full">
							<FaEllipsisVertical className="text-small" />
						</Button>
					</DropdownTrigger>
					<DropdownMenu
						disallowEmptySelection
						aria-label="Columns"
						closeOnSelect
						// selectionMode="single"
						onAction={(selectedKeys) => {
							if (selectedKeys === "chart") {
								setIsPie((a) => !a);
							}
							if (selectedKeys === "details") {
								setDetailsVisible((d) => !d);
							}
						}}
					>
						<DropdownItem key="chart" className="[&>span]:flex [&>span]:gap-2">
							{isPie ? <FaChartBar size={20} /> : <FaChartPie size={20} />}{" "}
							Grafico em {!isPie ? "pizza" : "colunas"}
						</DropdownItem>
						<DropdownItem
							key="details"
							className="[&>span]:flex [&>span]:gap-2"
						>
							<FaEye size={20} /> Ver detalhes
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
			{isPie && (
				<Pie
					data={data}
					options={pieOptions}
					className="print:max-w-[310px] print:max-h-[310px]"
				/>
			)}
			{!isPie && (
				<Bar
					data={data}
					options={barOptions}
					className="print:max-w-[310px] print:max-h-[310px]"
				/>
			)}
			{detailsVisible && (
				<table className="mt-4">
					<thead>
						<tr>
							<th>Instituito</th>
							<th>Resposta</th>
						</tr>
					</thead>
					<tbody>
						{answers.surveysAnswers.map((answer, index) => (
							<tr
								key={answer.id}
								className={`border-t-2 border-b-2 border-neutral-300 ${
									index === answers.surveysAnswers.length - 1 ? "" : ""
								}`}
							>
								<td>{answer.osc?.name}</td>
								<td>
									{
										answer.responses?.find(
											(r) => r.question.name === surveyData.question,
										)?.answer
									}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default SurveyCharts;
