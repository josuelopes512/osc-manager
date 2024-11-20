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
	Tooltip,
} from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import type { Question, QuestionType, Survey } from "@prisma/client";
import { FaTrash } from "react-icons/fa";

const SurveyEdit = () => {
	const { id } = useParams<{ id: string | "new" }>();
	const router = useRouter();
	const { data: dataGetSurvey, isLoading: loadingGet } = useQuery({
		queryFn: ({ signal }) =>
			getData<Survey>({
				url: "survey",
				id: Number.parseInt(id, 10),
				signal,
			}),
		queryKey: ["survey-get-by-id", id],
		enabled: id !== "new",
	});

	const { mutateAsync: mutatePost, isPending: loadingPost } = useMutation({
		mutationFn: async (val: PostData<Survey>) => postData<Survey, Survey>(val),
		mutationKey: ["survey-post"],
	});

	const { mutateAsync: mutatePut, isPending: loadingPut } = useMutation({
		mutationFn: (val: PutData<Survey>) => putData<Survey, Survey>(val),
		mutationKey: ["survey-put"],
	});

	const { handleSubmit, setValue, control, reset, watch } = useForm<
		Survey & {
			questions: { name: string; questionType: QuestionType }[];
		},
		"surveys"
	>();

	const {
		fields: questionsFields,
		append: appendQuestions,
		remove: removeQuestions,
	} = useFieldArray({
		control,
		name: "questions",
	});

	const onSubmit = (data: Survey) => {
		if (id === "new")
			mutatePost({
				url: "/survey",
				data,
			})
				.then(() => {
					toast.success("Questionário cadastrado com sucesso");
					reset();
					router.refresh();
				})
				.catch((error: any) => {
					toastErrorsApi(error);
				});
		else
			mutatePut({
				url: "/survey",
				data,
				id: Number.parseInt(id, 10),
			})
				.then(() => {
					toast.success("Questionário atualizado com sucesso");
				})
				.catch((err) => {
					toastErrorsApi(err);
				});
	};

	const loading = loadingGet || loadingPost || loadingPut;

	useEffect(() => {
		if (dataGetSurvey && id !== "new") {
			setValue("name", dataGetSurvey.name);
		}
	}, [dataGetSurvey, id, setValue]);

	useEffect(() => {
		appendQuestions({ name: "", questionType: "ShortAnswer" });
	}, [appendQuestions]);

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
							label="Nome do questionário"
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
			{questionsFields?.map((item, indexQuestions) => {
				const questionType = watch(
					`questions.${indexQuestions}.questionType`,
				) as QuestionType;
				return (
					<div
						key={item.id}
						className="flex flex-col gap-4 overflow-auto rounded-large bg-content1 p-4 shadow-small"
					>
						<div className="mb-4 flex items-center justify-between">
							<span className="text-xl font-bold text-default-600">
								Pergunta {indexQuestions + 1}
							</span>
							<Tooltip
								content="Deletar pergunta"
								placement="bottom-end"
								className="text-white"
								color="danger"
							>
								<Button
									type="button"
									color="danger"
									className="w-fit rounded-full text-main-white"
									onClick={() => removeQuestions(indexQuestions)}
									isDisabled={loading}
									isIconOnly
								>
									<FaTrash size={20} className="text-white" />
								</Button>
							</Tooltip>
						</div>
						<Controller
							name={`questions.${indexQuestions}.questionType`}
							control={control}
							defaultValue="MultipleChoice"
							render={({ field, fieldState: { error } }) => (
								<Skeleton className="rounded-md" isLoaded={!loading}>
									<Select
										label="Tipo de pergunta"
										id={field.name}
										onChange={field.onChange}
										name={field.name}
										value={field.value}
										variant="bordered"
										color="primary"
										isInvalid={!!error}
										errorMessage={error?.message}
									>
										<SelectItem key="MultipleChoice" value="MultipleChoice">
											Multipla escolha
										</SelectItem>
										<SelectItem key="ShortAnswer" value="ShortAnswer">
											Texto
										</SelectItem>
										<SelectItem key="CheckBox" value="CheckBox">
											Caixa de seleção
										</SelectItem>
									</Select>
								</Skeleton>
							)}
						/>
						{questionType === "ShortAnswer" && (
							<Controller
								name={`questions.${indexQuestions}.name`}
								control={control}
								defaultValue=""
								rules={{ required: "Campo obrigatório" }}
								render={({ field, fieldState: { error } }) => (
									<Skeleton className="rounded-md" isLoaded={!loading}>
										<Input
											label="Pergunta"
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
						)}
						{questionType === "MultipleChoice" && (
							<Controller
								name={`questions.${indexQuestions}.name`}
								control={control}
								defaultValue=""
								rules={{ required: "Campo obrigatório" }}
								render={({ field, fieldState: { error } }) => (
									<Skeleton className="rounded-md" isLoaded={!loading}>
										<Input
											label="Pergunta"
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
						)}
						{questionType === "CheckBox" && (
							<Controller
								name={`questions.${indexQuestions}.name`}
								control={control}
								defaultValue=""
								rules={{ required: "Campo obrigatório" }}
								render={({ field, fieldState: { error } }) => (
									<Skeleton className="rounded-md" isLoaded={!loading}>
										<Input
											label="Pergunta"
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
						)}
					</div>
				);
			})}
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

export default SurveyEdit;
