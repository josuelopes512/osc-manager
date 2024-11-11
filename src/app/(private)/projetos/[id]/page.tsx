"use client";
import {
	getData,
	postData,
	putData,
	toastErrorsApi,
} from "@/lib/functions.api";
import type { PostData, PutData } from "@/types/api";
import {
	Button,
	Input,
	Select,
	SelectItem,
	Skeleton,
	Textarea,
} from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { ProjectFormProps } from "./types";

import { Combobox } from "@/components/ui/combobox";
import type { Course, OSC, Project, Semester, Student } from "@prisma/client";

const ProjectEdit = () => {
	const { id } = useParams<{ id: string | "new" }>();
	const router = useRouter();
	const { data: dataGetProject, isLoading: loadingGet } = useQuery({
		queryFn: ({ signal }) =>
			getData<Project>({
				url: "project",
				id: Number.parseInt(id, 10),
				signal,
				query: "include.osc=true",
			}),
		queryKey: ["project-get-by-id", id],
		enabled: id !== "new",
	});

	const { mutateAsync: mutatePost, isPending: loadingPost } = useMutation({
		mutationFn: async (val: PostData<Project>) =>
			postData<Project, Project>(val),
		mutationKey: ["project-post"],
	});

	const { mutateAsync: mutatePut, isPending: loadingPut } = useMutation({
		mutationFn: (val: PutData<Project>) => putData<Project, Project>(val),
		mutationKey: ["project-put"],
	});

	const { data: dataGetOSC, isLoading: loadingGetOSC } = useQuery({
		queryFn: ({ signal }) =>
			getData<OSC[]>({
				url: "osc",
				signal,
			}),
		queryKey: ["osc-get"],
		refetchOnMount: false,
		refetchOnReconnect: false,
	});

	const { data: dataGetSemester, isLoading: loadingGetSemester } = useQuery({
		queryFn: ({ signal }) =>
			getData<Semester[]>({
				url: "semester",
				signal,
			}),
		queryKey: ["semester-get"],
		refetchOnMount: false,
		refetchOnReconnect: false,
	});

	const { data: dataGetStudent, isLoading: loadingGetStudent } = useQuery({
		queryFn: ({ signal }) =>
			getData<(Student & { course: Course })[]>({
				url: "student",
				signal,
				query: "include.course=true",
			}),
		queryKey: ["student-get"],
		refetchOnMount: false,
		refetchOnReconnect: false,
	});

	const { handleSubmit, setValue, control, reset, register } = useForm<
		ProjectFormProps,
		"projects"
	>();

	const onSubmit = (data: ProjectFormProps) => {
		const parseData = {
			...data,
			oscId: Number(data.oscId),
			semesterId: Number(data.semesterId),
			studentIds: data.studentIds.map((a) => Number(a)),
		};
		if (id === "new")
			mutatePost({
				url: "/project",
				data: parseData,
			})
				.then(() => {
					toast.success("Aluno cadastrado com sucesso");
					reset();
					router.refresh();
				})
				.catch((error: any) => {
					toastErrorsApi(error);
				});
		else
			mutatePut({
				url: "/project",
				data: parseData,
				id: Number.parseInt(id, 10),
			})
				.then(() => {
					toast.success("Aluno atualizado com sucesso");
				})
				.catch((err) => {
					toastErrorsApi(err);
				});
	};

	const loading = loadingGet || loadingPost || loadingPut;

	useEffect(() => {
		if (dataGetProject && id !== "new") {
			setValue("name", dataGetProject.name);
			setValue("oscId", String(dataGetProject.oscId));
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
							label="Nome do projeto"
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
				name="description"
				control={control}
				defaultValue=""
				render={({ field, fieldState: { error } }) => (
					<Skeleton className="rounded-md" isLoaded={!loading}>
						<Textarea
							label="Descrição"
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

			<input hidden {...register("link")} />
			<Controller
				name="oscId"
				control={control}
				rules={{ required: "Campo obrigatório" }}
				render={({ field, fieldState: { error } }) => (
					<Skeleton
						className="min-h-14 rounded-md [&>div]:min-h-14"
						isLoaded={!loadingGetOSC}
					>
						<Combobox
							id={field.name}
							data={dataGetOSC ?? []}
							value={field.value}
							onChange={field.onChange}
							label="OSC"
							filterKey={["name"]}
							textValueKey="name"
							isRequired
							isInvalid={!!error}
							errorMessage={error?.message}
							itemRenderer={(item) => (
								<span className="font-bold">{item.name}</span>
							)}
						/>
					</Skeleton>
				)}
			/>
			{dataGetSemester && (
				<Controller
					name="semesterId"
					control={control}
					rules={{ required: "Campo obrigatório" }}
					render={({ field, fieldState: { error } }) => (
						<Skeleton className="rounded-md" isLoaded={!loadingGetSemester}>
							<Select
								label="Semestre"
								id={field.name}
								onChange={field.onChange}
								name={field.name}
								selectedKeys={field.value ? [field.value] : new Set([])}
								variant="bordered"
								color="primary"
								isInvalid={!!error}
								isRequired
								errorMessage={error?.message}
								classNames={{
									value: "text-foreground",
								}}
							>
								{dataGetSemester?.map((a) => (
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
				name="studentIds"
				control={control}
				rules={{ required: "Campo obrigatório" }}
				render={({ field, fieldState: { error } }) => (
					<Skeleton
						className="min-h-14 rounded-md [&>div]:min-h-14"
						isLoaded={!loadingGetStudent}
					>
						<Combobox
							id={field.name}
							data={dataGetStudent ?? []}
							value={field.value}
							onChange={field.onChange}
							label="Alunos"
							filterKey={["name"]}
							textValueKey="name"
							isRequired
							isMultiple
							isInvalid={!!error}
							errorMessage={error?.message}
							itemRenderer={(item) => (
								<div className="flex gap-4">
									<span className="font-bold">{item.name}</span>
									<span className="text-sm italic">({item.course.name})</span>
								</div>
							)}
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
