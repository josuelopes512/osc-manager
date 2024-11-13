"use client";
import {
	getData,
	postData,
	putData,
	toastErrorsApi,
} from "@/lib/functions.api";
import type { PostData, PutData } from "@/types/api";
import { Button, Input, Select, SelectItem, Skeleton } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { StudentFormProps } from "./types";

import { Combobox } from "@/components/ui/combobox";
import type { Course, Student } from "@prisma/client";

const StudentEdit = () => {
	const { id } = useParams<{ id: string | "new" }>();
	const { data: dataGetStudent, isLoading: loadingGet } = useQuery({
		queryFn: ({ signal }) =>
			getData<Student>({
				url: "student",
				id: Number.parseInt(id, 10),
				signal,
				query: "include.course=true",
			}),
		queryKey: ["student-get-by-id", id],
		enabled: id !== "new",
	});

	const { mutateAsync: mutatePost, isPending: loadingPost } = useMutation({
		mutationFn: async (val: PostData<Student>) =>
			postData<Student, Student>(val),
		mutationKey: ["student-post"],
	});

	const { mutateAsync: mutatePut, isPending: loadingPut } = useMutation({
		mutationFn: (val: PutData<Student>) => putData<Student, Student>(val),
		mutationKey: ["student-put"],
	});

	const { data: dataGetCourse, isLoading: loadingGetCourse } = useQuery({
		queryFn: ({ signal }) =>
			getData<Course[]>({
				url: "course",
				signal,
			}),
		queryKey: ["course-get"],
		refetchOnMount: false,
		refetchOnReconnect: false,
	});

	const { handleSubmit, setValue, control, reset, register } = useForm<
		StudentFormProps,
		"students"
	>();

	const onSubmit = (data: StudentFormProps) => {
		const parseData = {
			...data,
			courseId: Number(data.courseId),
		};
		if (id === "new") {
			console.log("Submitting new student:", parseData); // Debug statement

			mutatePost({
				url: "/student",
				data: parseData,
			})
				.then(() => {
					toast.success("Aluno cadastrado com sucesso");
					reset();
				})
				.catch((error: any) => {
					toastErrorsApi(error);
				});
		} else
			mutatePut({
				url: "/student",
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
		if (dataGetStudent && id !== "new") {
			setValue("name", dataGetStudent.name);
			setValue("matriculation", dataGetStudent.matriculation);
			setValue("email", dataGetStudent.email);
			setValue("whatsapp", dataGetStudent.whatsapp);
			setValue("courseId", String(dataGetStudent.courseId));
		}
	}, [dataGetStudent, id, setValue]);

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
				name="courseId"
				control={control}
				rules={{ required: "Campo obrigatório" }}
				render={({ field, fieldState: { error } }) => (
					<Skeleton className="rounded-md" isLoaded={!loadingGetCourse}>
						<Select
							items={dataGetCourse ?? []}
							label="Curso"
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
							{(course) => (
								<SelectItem key={course.id} value={course.id}>
									{course.name}
								</SelectItem>
							)}
						</Select>
					</Skeleton>
				)}
			/>
			<Controller
				name="matriculation"
				control={control}
				defaultValue=""
				render={({ field, fieldState: { error } }) => (
					<Skeleton className="rounded-md" isLoaded={!loading}>
						<Input
							label="Matrícula"
							id={field.name}
							type="text"
							onChange={field.onChange}
							name={field.name}
							value={field.value ?? ""}
							maxLength={7}
							variant="bordered"
							color="primary"
							isInvalid={!!error}
							errorMessage={error?.message}
						/>
					</Skeleton>
				)}
			/>
			<Controller
				name="whatsapp"
				control={control}
				defaultValue=""
				render={({ field, fieldState: { error } }) => (
					<Skeleton className="rounded-md" isLoaded={!loading}>
						<Input
							label="Whatsapp"
							id={field.name}
							type="text"
							placeholder=""
							onChange={(e) => {
								const value = e.target.value.replace(/\D/g, "");
								const formattedValue = value.replace(
									/(\d{2})(\d{5})(\d{4})/,
									"($1) $2-$3",
								);
								field.onChange(formattedValue);
							}}
							maxLength={15}
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
				name="email"
				control={control}
				defaultValue=""
				rules={{
					pattern: {
						value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
						message: "Email inválido",
					},
				}}
				render={({ field, fieldState: { error, invalid } }) => (
					<Skeleton className="rounded-md" isLoaded={!loading}>
						<Input
							label="Email"
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

export default StudentEdit;
