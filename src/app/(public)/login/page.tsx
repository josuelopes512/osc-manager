"use client";
import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";

import type { FormLoginProps } from "@/app/(public)/login/types";
import Loading from "@/components/loading";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
	const redirect = decodeURIComponent(useSearchParams().get("redirect") || "");

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
		<div className="flex min-h-screen items-center bg-foreground-50 justify-center">
			{loading && <Loading />}
			{!loading && (
				<div className="rounded-md bg-content1 p-10 shadow-sm shadow-blue-100 brightness-95 md:w-[500px] md:p-16 md:pt-8">
					{/* <div className="mb-6 flex items-center justify-center">
						<Image alt="logo" src={logoBlack} width={200} height={200} />
					</div> */}
					<h1 className="my-8 text-center text-4xl font-bold">Login</h1>
					<div className="flex flex-col justify-center gap-4">
						<Button
							variant="bordered"
							type="submit"
							onClick={() => {
								mutateLoginGoogle();
							}}
							className="flex w-full items-center justify-between"
						>
							<FaGoogle size={20} />
							<span>{"sign-in-with"} Google</span>
							<div />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Login;
