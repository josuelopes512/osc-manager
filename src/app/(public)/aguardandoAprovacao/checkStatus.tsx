"use client";

import { getData } from "@/lib/functions.api";
import { Button } from "@nextui-org/react";
import type { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { FaSpinner } from "react-icons/fa6";

import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function CheckStatus() {
	const email = decodeURIComponent(useSearchParams().get("email") || "");
	const { data, isLoading } = useQuery({
		queryKey: ["check-status-get"],
		queryFn: ({ signal }) =>
			getData<User>({
				url: "/user/approval/checkStatus",
				signal,
				query: `where.email=${email}`,
			}),
		refetchInterval: 5000,
	});

	const loading = isLoading || !data?.approved;

	useEffect(() => {
		if (data?.approved) {
			toast.success("Aprovado com sucesso!");
			setTimeout(() => {
				window.location.href = "/dashboard";
			}, 3000);
		}
	}, [data?.approved]);

	return (
		<>
			{loading && <FaSpinner className="animate-spin text-4xl" />}

			{data?.approved && (
				<div className="bg-green-400 p-4 rounded-md">
					<p className="text-gray-600">Seu pedido foi aprovado com sucesso!</p>
				</div>
			)}
			{!data?.approved && (
				<>
					<h1 className="text-2xl font-bold mb-4">Aguardando aprovação</h1>
					<p className="text-gray-600">
						Seu pedido está sendo processado. Por favor, aguarde.
					</p>
					<Button
						type="submit"
						variant="ghost"
						className="w-fit mt-8"
						color="danger"
						as={Link}
						href="/"
					>
						Sair
					</Button>
				</>
			)}
		</>
	);
}
