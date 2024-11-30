"use client";
import { postData, putData, toastErrorsApi } from "@/lib/functions.api";
import type { PostData, PutData } from "@/types/api";
import {
	Button,
	Input,
	Select,
	SelectItem,
	Skeleton,
	Tooltip,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import type { OSCFormProps } from "./types";

import type { POSTOSCDTO } from "@/app/api/osc/dto/post";
import type { OSC } from "@prisma/client";
import { FaTrash } from "react-icons/fa6";
import { useOSCData } from "./hooks/useOSCData";
import { useSocialPlatforms } from "./hooks/useSocialPlatforms";
import { getCEP } from "@/lib/utils";
import { maskCEP } from "@/lib/masks";

const OSCEdit = () => {
	const { id } = useParams<{ id: string | "new" }>();

	const { dataGetOSC, loadingGet } = useOSCData(id);
	const { dataGetSocialPlatform, loadingGetSocialPlatform } =
		useSocialPlatforms();

	const { mutateAsync: mutatePost, isPending: loadingPost } = useMutation({
		mutationFn: async (val: PostData<POSTOSCDTO>) =>
			postData<OSC, POSTOSCDTO>(val),
		mutationKey: ["osc-post"],
	});

	const { mutateAsync: mutatePut, isPending: loadingPut } = useMutation({
		mutationFn: (val: PutData<POSTOSCDTO>) => putData<OSC, POSTOSCDTO>(val),
		mutationKey: ["osc-put"],
	});

	const { mutateAsync: mutateGetCEP, isPending: loadingCEP } = useMutation({
		mutationFn: async (val: string) => getCEP(val),
		mutationKey: ["cep-get"],
	});

	const { handleSubmit, setValue, control, reset } = useForm<
		OSCFormProps,
		"oscs"
	>();

	const {
		fields: oscSocialsFields,
		append: appendOscSocials,
		remove: removeOscSocials,
	} = useFieldArray({
		control,
		name: "oscSocials",
	});

	const onSubmit = (data: OSCFormProps) => {
		const existingOscSocials = dataGetOSC?.oscSocials || [];
		const newOscSocials = data.oscSocials.filter(
			(a) => !a.id && a.socialPlatformId !== "",
		);
		const updatedOscSocials = data.oscSocials.filter((a) => a.id);
		const deletedOscSocialIds = existingOscSocials
			.filter(
				(existing) =>
					!data.oscSocials.some((current) => current.id === existing.id),
			)
			.map((deleted) => deleted.id);

		const parseData = {
			name: data.name,
			oscSocials: {
				create: newOscSocials.map((a) => ({
					socialPlatformId: Number(a.socialPlatformId),
					link: a.link,
				})),
				update: updatedOscSocials.map((a) => ({
					id: a.id,
					socialPlatformId: Number(a.socialPlatformId),
					link: a.link,
				})),
				delete: deletedOscSocialIds,
			},
		} as POSTOSCDTO & {
			oscSocials: { create: any[]; update: any[]; delete: number[] };
		};

		if (id === "new") {
			mutatePost({
				url: "/osc",
				data: parseData,
			})
				.then(() => {
					toast.success("OSC cadastrada com sucesso");
					reset();
				})
				.catch((error: any) => {
					toastErrorsApi(error);
				});
		} else {
			mutatePut({
				url: "/osc",
				data: parseData,
				id: Number.parseInt(id, 10),
			})
				.then(() => {
					toast.success("OSC atualizada com sucesso");
				})
				.catch((err) => {
					toastErrorsApi(err);
				});
		}
	};

	const loading =
		loadingGet || loadingPost || loadingPut || loadingGetSocialPlatform;

	useEffect(() => {
		if (dataGetOSC && id !== "new") {
			setValue("name", dataGetOSC.name);
			setValue(
				"oscSocials",
				dataGetOSC.oscSocials.map((a) => ({
					...a,
					socialPlatformId: String(a.socialPlatformId),
				})),
			);
		}
	}, [dataGetOSC, id, setValue]);

	useEffect(() => {
		appendOscSocials({
			link: "",
			socialPlatformId: "",
		});
	}, [appendOscSocials]);

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
				name={"address.zipCode"}
				control={control}
				defaultValue=""
				render={({ field, fieldState: { error } }) => (
					<Skeleton className="rounded-md" isLoaded={!loading}>
						<Input
							label="CEP"
							id={field.name}
							type="text"
							onChange={(val) => {
								field.onChange(maskCEP(val.target.value));
								if (val.target.value.length === 9) {
									mutateGetCEP(val.target.value).then((data) => {
										setValue("address.city", data.localidade);
										setValue("address.state", data.uf);
										setValue("address.street", data.logradouro);
										setValue("address.number", data.complemento);
										setValue("address.neighborhood", data.bairro);
									});
								}
							}}
							name={field.name}
							value={field.value}
							variant="bordered"
							color="primary"
							isInvalid={!!error}
							errorMessage={error?.message}
						/>
					</Skeleton>
				)}
			/>
			<Controller
				name="address.street"
				control={control}
				defaultValue=""
				render={({ field, fieldState: { error } }) => (
					<Skeleton className="rounded-md" isLoaded={!loading}>
						<Input
							label="Logradouro"
							id={field.name}
							type="text"
							onChange={field.onChange}
							name={field.name}
							value={field.value}
							variant="bordered"
							color="primary"
							isInvalid={!!error}
							errorMessage={error?.message}
						/>
					</Skeleton>
				)}
			/>
			<Controller
				name="address.number"
				control={control}
				defaultValue=""
				render={({ field, fieldState: { error } }) => (
					<Skeleton className="rounded-md" isLoaded={!loading}>
						<Input
							label="Número"
							id={field.name}
							type="text"
							onChange={field.onChange}
							name={field.name}
							value={field.value}
							variant="bordered"
							color="primary"
							isInvalid={!!error}
							errorMessage={error?.message}
						/>
					</Skeleton>
				)}
			/>
			<Controller
				name="address.neighborhood"
				control={control}
				defaultValue=""
				render={({ field, fieldState: { error } }) => (
					<Skeleton className="rounded-md" isLoaded={!loading}>
						<Input
							label="Bairro"
							id={field.name}
							type="text"
							onChange={field.onChange}
							name={field.name}
							value={field.value}
							variant="bordered"
							color="primary"
							isInvalid={!!error}
							errorMessage={error?.message}
						/>
					</Skeleton>
				)}
			/>
			<Controller
				name="address.city"
				control={control}
				defaultValue=""
				render={({ field, fieldState: { error } }) => (
					<Skeleton className="rounded-md" isLoaded={!loading}>
						<Input
							label="Cidade"
							id={field.name}
							type="text"
							onChange={field.onChange}
							name={field.name}
							value={field.value}
							variant="bordered"
							color="primary"
							isInvalid={!!error}
							errorMessage={error?.message}
						/>
					</Skeleton>
				)}
			/>
			<Controller
				name="address.state"
				control={control}
				defaultValue=""
				render={({ field, fieldState: { error } }) => (
					<Skeleton className="rounded-md" isLoaded={!loading}>
						<Input
							label="Estado"
							id={field.name}
							type="text"
							onChange={field.onChange}
							name={field.name}
							value={field.value}
							variant="bordered"
							color="primary"
							isInvalid={!!error}
							errorMessage={error?.message}
						/>
					</Skeleton>
				)}
			/>
			{oscSocialsFields?.map((item, indexOscsocials) => (
				<div
					key={item.id}
					className="flex flex-col gap-4 overflow-auto rounded-large bg-content1 p-4 shadow-small"
				>
					<div className="mb-4 flex items-center justify-between">
						<span className="text-xl font-bold text-default-600">
							Plataforma social {indexOscsocials + 1}
						</span>
						<Tooltip
							content="Deletar plataforma social"
							placement="bottom-end"
							className="text-white"
							color="danger"
						>
							<Button
								type="button"
								color="danger"
								className="w-fit rounded-full text-main-white"
								onPress={() => removeOscSocials(indexOscsocials)}
								isDisabled={loading}
								isIconOnly
							>
								<FaTrash size={20} className="text-white" />
							</Button>
						</Tooltip>
					</div>
					{dataGetSocialPlatform && (
						<Controller
							name={`oscSocials.${indexOscsocials}.socialPlatformId`}
							control={control}
							defaultValue=""
							render={({ field, fieldState: { error } }) => (
								<Skeleton className="rounded-md" isLoaded={!loading}>
									<Select
										label="Plataforma social"
										id={field.name}
										onChange={field.onChange}
										name={field.name}
										selectedKeys={field.value ? [field.value] : new Set([])}
										variant="bordered"
										color="primary"
										isInvalid={!!error}
										errorMessage={error?.message}
										classNames={{
											value: "text-foreground",
										}}
									>
										{dataGetSocialPlatform?.map((a) => (
											<SelectItem key={a.id} value={a.id}>
												{a.name}
											</SelectItem>
										))}
									</Select>
								</Skeleton>
							)}
						/>
					)}
					<Controller
						name={`oscSocials.${indexOscsocials}.link`}
						control={control}
						defaultValue="outro"
						render={({ field, fieldState: { error } }) => (
							<Skeleton className="rounded-md" isLoaded={!loading}>
								<Input
									label="Link"
									id={field.name}
									type="text"
									onChange={field.onChange}
									name={field.name}
									value={field.value}
									variant="bordered"
									color="primary"
									isInvalid={!!error}
									errorMessage={error?.message}
								/>
							</Skeleton>
						)}
					/>
				</div>
			))}
			<Button
				type="button"
				variant="bordered"
				color="primary"
				className="w-fit rounded-full data-[hover=true]:bg-main-200 data-[hover=true]:text-main-white"
				isDisabled={loading}
				onPress={() => {
					appendOscSocials({
						link: "",
						socialPlatformId: "",
					});
				}}
			>
				Adicionar plataforma social
			</Button>
			<Button
				type="submit"
				variant="ghost"
				className="w-fit"
				isDisabled={loading}
			>
				Salvar
			</Button>
		</form>
	);
};

export default OSCEdit;
