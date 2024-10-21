"use client";
import {
	getData,
	postData,
	putData,
	toastErrorsApi,
} from "@/lib/functions.api";
import type { PostData, PutData } from "@/types/api";
import { Button, Input, Skeleton } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import type { OSCFormProps } from "./types";

import { Combobox } from "@/components/ui/combobox";
import type { OSC, SocialPlatform } from "@prisma/client";

const OSCEdit = () => {
	const { id } = useParams<{ id: string | "new" }>();

	const { data: dataGetOSC, isLoading: loadingGet } = useQuery({
		queryFn: ({ signal }) =>
			getData<OSC>({
				url: "osc",
				id: Number.parseInt(id, 10),
				signal,
			}),
		queryKey: ["osc-get-by-id", id],
		enabled: id !== "new",
	});

	const { mutateAsync: mutatePost, isPending: loadingPost } = useMutation({
		mutationFn: async (val: PostData<OSC>) => postData<OSC, OSC>(val),
		mutationKey: ["osc-post"],
	});

	const { mutateAsync: mutatePut, isPending: loadingPut } = useMutation({
		mutationFn: (val: PutData<OSC>) => putData<OSC, OSC>(val),
		mutationKey: ["osc-put"],
	});

	const { data: dataGetSocialPlatform, isLoading: loadingGetSocialPlatform } =
		useQuery({
			queryFn: ({ signal }) =>
				getData<SocialPlatform[]>({
					url: "socialPlatform",
					signal,
				}),
			queryKey: ["socials-platforms-get"],
			refetchOnMount: false,
			refetchOnReconnect: false,
		});

	const { handleSubmit, setValue, control, reset, getValues } = useForm<
		OSCFormProps,
		"oscs"
	>();

	const onSubmit = (data: OSCFormProps) => {
		if (id === "new")
			mutatePost({
				url: "/osc",
				data,
			})
				.then(() => {
					toast.success("OSC cadastrada com sucesso");
					reset();
				})
				.catch((error: any) => {
					toastErrorsApi(error);
				});
		else
			mutatePut({
				url: "/osc",
				data,
				id: Number.parseInt(id, 10),
			})
				.then(() => {
					toast.success("OSC atualizada com sucesso");
				})
				.catch((err) => {
					toastErrorsApi(err);
				});
	};

	const loading = loadingGet || loadingPost || loadingPut;

	useEffect(() => {
		if (dataGetOSC && id !== "new") {
			setValue("name", dataGetOSC.name);
		}
	}, [dataGetOSC, id, setValue]);

	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
			className="flex w-full flex-col gap-4"
		>
			<Controller
				name="name"
				control={control}
				defaultValue=""
				rules={{ required: "Campo obrigatório" }}
				render={({ field, fieldState: { error } }) => (
					<Skeleton className="rounded-md" isLoaded={!loading}>
						<Input
							label="Nome"
							id={field.name}
							type="text"
							onChange={field.onChange}
							name={field.name}
							value={field.value}
							variant="bordered"
							color="primary"
							isRequired
							isInvalid={!!error}
							errorMessage={error?.message}
						/>
					</Skeleton>
				)}
			/>
			<Controller
				name="location"
				control={control}
				defaultValue=""
				render={({ field, fieldState: { error } }) => (
					<Skeleton className="rounded-md" isLoaded={!loading}>
						<Input
							label="Endereço/Localização"
							id={field.name}
							type="text"
							onChange={field.onChange}
							name={field.name}
							value={field.value ?? ""}
							variant="bordered"
							color="primary"
							isInvalid={!!error}
							errorMessage={error?.message}
						/>
					</Skeleton>
				)}
			/>
			<Controller
				name="courseId"
				control={control}
				// rules={{ required: "Campo obrigatório" }}
				render={({ field, fieldState: { error } }) => (
					<Skeleton
						className="h-14 rounded-md [&>div]:h-14"
						isLoaded={!loadingGetSocialPlatform}
					>
						<Combobox
							id={field.name}
							data={dataGetSocialPlatform ?? []}
							value={field.value}
							onChange={field.onChange}
							label="Plataforma social"
							filterKey={["name"]}
							textValueKey="name"
							// isRequired
							itemRenderer={(item) => (
								<span className="font-bold">{item.name}</span>
							)}
						/>
					</Skeleton>
				)}
			/>
			<Button
				type="submit"
				variant="flat"
				color="primary"
				className="w-fit"
				isDisabled={loading}
			>
				Salvar
			</Button>
		</form>
	);
};

export default OSCEdit;
