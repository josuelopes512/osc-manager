"use client";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";

import type { FormLoginProps } from "@/app/(public)/login/types";
import logo from "@/assets/imagens/logo-full.png";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
	const redirect = decodeURIComponent(
		useSearchParams().get("callbackUrl") || "",
	);

	const searchParams = useSearchParams();

	const ref = searchParams.get("ref") ?? "";

	const [selectedKeys, setSelectedKeys] = React.useState<any>();

	const { control, handleSubmit, watch } = useForm<FormLoginProps>();

	const { mutate: mutateLoginGoogle, isPending: isPendingGoogle } = useMutation(
		{
			mutationFn: () => signIn("google", { callbackUrl: redirect }),
			mutationKey: ["login"],
		},
	);

	const router = useRouter();

	const loading = isPendingGoogle;

	return (
		<div className="min-h-screen flex items-center justify-center bg-content2">
			<Card className="py-4 w-full max-w-md">
				<CardHeader className="flex flex-col text-center">
					<h1 className="text-2xl font-bold">Bem vindo</h1>
					<div>Faça login para acessar ou criar sua conta</div>
				</CardHeader>
				<CardBody>
					<div className="flex justify-center mt-8">
						<Image src={logo.src} alt="App Logo" className="w-80 h-80 mb-6" />
					</div>
					<Button
						onPress={() => {
							mutateLoginGoogle();
						}}
						className="w-full bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
					>
						<FaGoogle className="mr-2 h-4 w-4" />
						Continuar com Google
					</Button>
				</CardBody>
			</Card>
		</div>
	);
};

export default Login;
