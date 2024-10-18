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
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { StudentFormProps } from "./types";

import { Combobox } from "@/components/ui/combobox";
import { useSidebar } from "@/hooks/use-sidebar";
// import { Combobox } from "@/components/ui/combobox";
import type { Course, Student } from "@prisma/client";

const StudentEdit = () => {
	const { id } = useParams<{ id: string | "new" }>();
	const { isOpen } = useSidebar();

	const { data: dataGetStudent, isLoading: loadingGet } = useQuery({
		queryFn: ({ signal }) =>
			getData<Student>({
				url: "client",
				id: Number.parseInt(id, 10),
				signal,
				query: "include.client=true",
			}),
		queryKey: ["client-get", id],
		enabled: id !== "new",
	});

	const { mutateAsync: mutatePost, isPending: loadingPost } = useMutation({
		mutationFn: async (val: PostData<Student>) =>
			postData<Student, Student>(val),
		mutationKey: ["client-post"],
	});

	const { mutateAsync: mutatePut, isPending: loadingPut } = useMutation({
		mutationFn: (val: PutData<Student>) => putData<Student, Student>(val),
		mutationKey: ["client-put"],
	});

	const { handleSubmit, setValue, control, reset, getValues } = useForm<
		StudentFormProps,
		"students"
	>();

	const onSubmit = (data: StudentFormProps) => {
		const parseData = {
			...data,
			courseId: Number(data.courseId),
		};
		if (id === "new")
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
		else
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

	// const [clientSearchTerm, setClientSearchTerm] = useState('')

	useEffect(() => {
		if (dataGetStudent && id !== "new") {
			setValue("name", dataGetStudent.name);
			setValue("semester", String(dataGetStudent.semester));
			setValue("matriculation", dataGetStudent.matriculation);
			setValue("courseId", String(dataGetStudent.courseId));
		}
	}, [dataGetStudent, id, setValue]);

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

	// const filteredData = useMemo(() => {
	//   if (clientSearchTerm === '') {
	//     return dataGetCourse
	//   } else {
	//     return dataGetCourse?.filter((item) =>
	//       item.fantasyName.toLowerCase().includes('lav'.toLowerCase()),
	//     )
	//   }
	// }, [dataGetCourse, clientSearchTerm])

	// useEffect(() => {
	//   console.log(filteredData)
	//   console.log(clientSearchTerm)
	// }, [clientSearchTerm, filteredData])

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
				name="matriculation"
				control={control}
				defaultValue=""
				rules={{ required: "Campo obrigatório" }}
				render={({ field, fieldState: { error } }) => (
					<Skeleton className="rounded-md" isLoaded={!loading}>
						<Input
							label="Matrícula"
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
				name="semester"
				control={control}
				defaultValue=""
				rules={{ required: "Campo obrigatório" }}
				render={({ field, fieldState: { error } }) => (
					<Skeleton className="rounded-md" isLoaded={!loading}>
						<Input
							label="Semestre"
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
					<Skeleton
						className="h-14 rounded-md [&>div]:h-14"
						isLoaded={!loadingGetCourse}
					>
						<Combobox
							id={field.name}
							data={dataGetCourse ?? []}
							value={field.value}
							onChange={field.onChange}
							label="Curso"
							filterKey={["name"]}
							textValueKey="name"
							isRequired
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

export default StudentEdit;
