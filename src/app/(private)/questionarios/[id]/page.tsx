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
	Radio,
	Select,
	SelectItem,
	Skeleton,
	Switch,
	Textarea,
	Tooltip,
} from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import type { POSTSurveyDTO } from "@/app/api/survey/dto/post";
import type { QuestionType, Survey } from "@prisma/client";
import { FaCheckSquare, FaRegDotCircle, FaTrash } from "react-icons/fa";
import { IoText } from "react-icons/io5";
import FieldArrayCheckBox from "./components/FieldArrayCheckBox";
import FieldArrayMultipleChoice from "./components/FieldArrayMultipleChoice";
import type { SurveyWithQuestions } from "./types";

const SurveyEdit = () => {
	const { id } = useParams<{ id: string | "new" }>();
	const router = useRouter();

	const { data: dataGetSurvey, isLoading: loadingGet } = useQuery({
		queryFn: ({ signal }) =>
			getData<SurveyWithQuestions>({
				url: "survey",
				id: Number.parseInt(id, 10),
				signal,
				query:
					"include.questions.include.multipleChoice=true" +
					"&&include.questions.include.checkBox=true" +
					"&&include.questions.orderBy.order=asc",
			}),
		queryKey: ["survey-get-by-id", id],
		enabled: id !== "new",
	});

	const [lastOrder, setLastOrder] = useState(
		dataGetSurvey?.questions?.length || 1,
	);

	const { mutateAsync: mutatePost, isPending: loadingPost } = useMutation({
		mutationFn: async (val: PostData<POSTSurveyDTO>) =>
			postData<Survey, POSTSurveyDTO>(val),
		mutationKey: ["survey-post"],
	});

	const { mutateAsync: mutatePut, isPending: loadingPut } = useMutation({
		mutationFn: (val: PutData<POSTSurveyDTO>) =>
			putData<Survey, POSTSurveyDTO>(val),
		mutationKey: ["survey-put"],
	});

	const { handleSubmit, setValue, control, reset, watch } = useForm<
		SurveyWithQuestions,
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

	const onSubmit = (data: SurveyWithQuestions) => {
		const existingQuestions = dataGetSurvey?.questions || [];

		data.questions = data.questions.map((question) => {
			switch (question.type) {
				case "SHORT_ANSWER":
					return {
						...question,
						multipleChoice: undefined,
						checkBox: undefined,
					};
				case "MULTIPLE_CHOICE":
					return { ...question, checkBox: undefined };
				case "CHECK_BOX":
					return { ...question, multipleChoice: undefined };
				default:
					return question;
			}
		});

		console.log(data.questions);

		const parseData = {
			name: data.name,
			description: data.description,
			questions: {
				create: data.questions.map((q) => ({
					name: q.name,
					order: q.order,
					type: q.type,
					required: q.required,
					multipleChoice: q.multipleChoice,
					checkBox: q.checkBox,
				})),
				delete: existingQuestions.map((q) => q.id),
			},
		} as POSTSurveyDTO;

		// console.log(parseData);

		if (id === "new")
			mutatePost({
				url: "/survey",
				data: parseData,
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
				data: parseData,
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
			setValue("description", dataGetSurvey.description);
			setValue("questions", dataGetSurvey.questions);
		}
	}, [dataGetSurvey, id, setValue]);

	useEffect(() => {
		appendQuestions({
			name: "",
			order: 1,
			type: "SHORT_ANSWER",
			required: false,
			multipleChoice: [{ choice: "", order: 1 }],
			checkBox: [{ option: "", order: 1 }],
		});
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
			<Controller
				name="description"
				control={control}
				defaultValue=""
				render={({ field, fieldState: { error } }) => (
					<Skeleton className="rounded-md" isLoaded={!loading}>
						<Textarea
							label="Descrição do questionário"
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
			{questionsFields.map((item, indexQuestions) => {
				const type = watch(`questions.${indexQuestions}.type`) as QuestionType;

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
									onPress={() => removeQuestions(indexQuestions)}
									isDisabled={loading}
									isIconOnly
								>
									<FaTrash size={20} className="text-white" />
								</Button>
							</Tooltip>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
							<Controller
								name={`questions.${indexQuestions}.type`}
								control={control}
								rules={{ required: "Campo obrigatório" }}
								defaultValue="SHORT_ANSWER"
								render={({ field, fieldState: { error } }) => (
									<Skeleton
										className="rounded-md col-span-4 md:col-span-2 lg:col-span-1"
										isLoaded={!loading}
									>
										<Select
											label="Tipo"
											id={field.name}
											onChange={field.onChange}
											name={field.name}
											selectedKeys={field.value ? [field.value] : new Set([])}
											variant="bordered"
											color="primary"
											isRequired
											isInvalid={!!error}
											errorMessage={error?.message}
											items={[
												{
													key: "SHORT_ANSWER",
													textValue: "Texto",
												},
												{
													key: "MULTIPLE_CHOICE",
													textValue: "Multipla escolha",
												},
												{
													key: "CHECK_BOX",
													textValue: "Caixa de seleção",
												},
											]}
											renderValue={(items) =>
												items.map((item) => (
													<div
														key={item.key}
														className="flex items-center mt-1 gap-2"
													>
														{item.key === "SHORT_ANSWER" && <IoText size={20} />}
														{item.key === "MULTIPLE_CHOICE" && (
															<FaRegDotCircle size={20} />
														)}
														{item.key === "CHECK_BOX" && (
															<FaCheckSquare size={20} />
														)}
														<span>{item.textValue}</span>
													</div>
												))
											}
										>
											{(item) => (
												<SelectItem
													key={item.key}
													value={item.key}
													classNames={{
														title: "flex items-center gap-2",
													}}
													textValue={item.textValue}
												>
													{item.key === "SHORT_ANSWER" && <IoText size={20} />}
													{item.key === "MULTIPLE_CHOICE" && (
														<FaRegDotCircle size={20} />
													)}
													{item.key === "CHECK_BOX" && (
														<FaCheckSquare size={20} />
													)}
													{item.textValue}
												</SelectItem>
											)}
										</Select>
									</Skeleton>
								)}
							/>
							<Controller
								name={`questions.${indexQuestions}.name`}
								control={control}
								defaultValue=""
								rules={{ required: "Campo obrigatório" }}
								render={({ field, fieldState: { error } }) => (
									<Skeleton
										className="rounded-md col-span-4 md:col-span-2"
										isLoaded={!loading}
									>
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
							<Controller
								name={`questions.${indexQuestions}.required`}
								control={control}
								defaultValue={false}
								render={({ field, fieldState: { error } }) => (
									<Switch
										id={field.name}
										onValueChange={field.onChange}
										name={field.name}
										isSelected={field.value}
										color="success"
										className="col-span-1"
									>
										Obrigatório
									</Switch>
								)}
							/>
							{type === "MULTIPLE_CHOICE" && (
								<FieldArrayMultipleChoice
									control={control as any}
									name={`questions.${indexQuestions}.multipleChoice` as any}
								/>
							)}
							{type === "CHECK_BOX" && (
								<FieldArrayCheckBox
									control={control as any}
									name={`questions.${indexQuestions}.checkBox` as any}
								/>
							)}
						</div>
					</div>
				);
			})}
			<Button
				type="button"
				variant="ghost"
				className="w-fit"
				isDisabled={loading}
				onPress={() => {
					appendQuestions({
						name: "",
						order: questionsFields?.length,
						type: "SHORT_ANSWER",
						multipleChoice: [{ choice: "", order: 1 }],
						checkBox: [{ option: "", order: 1 }],
					});
				}}
			>
				Adicionar pergunta
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

export default SurveyEdit;
