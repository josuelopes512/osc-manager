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

import type { Project } from "@prisma/client";

const ProjectEdit = () => {
	const { id } = useParams<{ id: string | "new" }>();

	const { data: dataGetProject, isLoading: loadingGet } = useQuery({
		queryFn: ({ signal }) =>
			getData<Project>({
				url: "course",
				id: Number.parseInt(id, 10),
				signal,
			}),
		queryKey: ["course-get-by-id", id],
		enabled: id !== "new",
	});

	const { mutateAsync: mutatePost, isPending: loadingPost } = useMutation({
		mutationFn: async (val: PostData<Project>) =>
			postData<Project, Project>(val),
		mutationKey: ["course-post"],
	});

	const { mutateAsync: mutatePut, isPending: loadingPut } = useMutation({
		mutationFn: (val: PutData<Project>) => putData<Project, Project>(val),
		mutationKey: ["course-put"],
	});

	const { handleSubmit, setValue, control, reset, getValues } = useForm<
		Project,
		"courses"
	>();

	const onSubmit = (data: Project) => {
		if (id === "new")
			mutatePost({
				url: "/course",
				data,
			})
				.then(() => {
					toast.success("Curso cadastrado com sucesso");
					reset();
				})
				.catch((error: any) => {
					toastErrorsApi(error);
				});
		else
			mutatePut({
				url: "/course",
				data,
				id: Number.parseInt(id, 10),
			})
				.then(() => {
					toast.success("Curso atualizado com sucesso");
				})
				.catch((err) => {
					toastErrorsApi(err);
				});
	};

	const loading = loadingGet || loadingPost || loadingPut;

	useEffect(() => {
		if (dataGetProject && id !== "new") {
			setValue("name", dataGetProject.name);
		}
	}, [dataGetProject, id, setValue]);

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

export default ProjectEdit;
