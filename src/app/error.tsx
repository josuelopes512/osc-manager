"use client";
import { Button } from "@nextui-org/react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ErrorPage() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<h1 className="mb-4 text-2xl font-bold">Erro</h1>
			<FaExclamationTriangle size={50} className="mb-4 text-2xl" />
			<h1 className="text-2xl font-bold">Algo deu errado</h1>
			<Button
				onClick={() => window.location.reload()}
				color="primary"
				className={"mt-8"}
			>
				Atualizar
			</Button>
		</div>
	);
}
