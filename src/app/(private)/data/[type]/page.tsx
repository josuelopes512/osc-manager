"use client";

import { InputFile } from "@/components/inputFile";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useParams } from "next/navigation";

import { useState } from "react";
import { toast } from "react-toastify";

export default function DataList() {
	const { type } = useParams<{ type: "importar" | "exportar" }>();
	const [file, setFile] = useState<File | null>(null);
	const [dataType, setDataType] = useState<string>("students");

	const handleExport = async () => {
		try {
			const response = await fetch(`/api/data-io?type=${dataType}`);

			if (!response.ok) {
				throw new Error(`Erro ao exportar ${dataType}.`);
			}

			const data = await response.json();

			// Baixar como arquivo JSON
			const blob = new Blob([JSON.stringify(data, null, 2)], {
				type: "application/json",
			});
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `${dataType}.json`;
			link.click();

			toast.success(
				`${dataType.charAt(0).toUpperCase() + dataType.slice(1)} exportado com sucesso!`,
			);
		} catch (error) {
			console.error(error);
			toast.error(`Falha ao exportar ${dataType}.`);
		}
	};

	const handleImport = async () => {
		if (!file) {
			toast.warn("Nenhum arquivo selecionado.");
			return;
		}

		try {
			const response = await fetch(`/api/data-io?type=${dataType}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: await file.text(),
			});

			if (!response.ok) {
				throw new Error(`Erro ao importar ${dataType}.`);
			}

			toast.success(
				`${dataType.charAt(0).toUpperCase() + dataType.slice(1)} importado com sucesso!`,
			);
		} catch (error) {
			console.error(error);
			toast.error(`Falha ao importar ${dataType}.`);
		}
	};

	const items = [
		{
			label: "Estudante",
			value: "students",
		},
		{
			label: "Curso",
			value: "courses",
		},
		{
			label: "OSC",
			value: "oscs",
		},
		{
			label: "Projeto",
			value: "projects",
		},
		{
			label: "Questionário",
			value: "surveys",
		},
	];

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Gerenciar Dados</h1>

			<div className="mb-4">
				<Select
					items={items}
					label="Tipo de dados"
					className="md:max-w-md mb-2 max-w-xs"
					onChange={(e) => {
						const value = e.target.value;
						setDataType(value);
					}}
					selectedKeys={[dataType]}
				>
					{(survey) => (
						<SelectItem key={survey.value} value={survey.value}>
							{survey.label}
						</SelectItem>
					)}
				</Select>
			</div>
			{type === "exportar" && (
				<div className="mb-6">
					<h2 className="text-xl font-semibold">Exportar Dados</h2>
					<Button
						variant="ghost"
						className="w-fit mt-4"
						color="success"
						onClick={handleExport}
						isDisabled={!dataType}
					>
						Exportar como JSON
					</Button>
				</div>
			)}
			{type === "importar" && (
				<div className="mb-6">
					<h2 className="text-xl font-semibold">Importar Dados</h2>
					<div className="max-w-md">
						<InputFile
							onChange={setFile}
							accept=".json"
							isRequired={false}
							label="Selecione um arquivo JSON"
						/>
					</div>
					<Button
						variant="ghost"
						color="success"
						className="w-fit mt-4"
						onClick={handleImport}
						isDisabled={!file || !dataType}
					>
						Importar JSON
					</Button>
				</div>
			)}
		</div>
	);
}
