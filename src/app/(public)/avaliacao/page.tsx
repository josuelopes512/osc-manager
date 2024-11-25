"use client";
import type { SurveyWithQuestions } from "@/app/(private)/questionarios/[id]/types";
import { getData, postData } from "@/lib/functions.api";
import {
	Button,
	Input,
	CheckboxGroup,
	Checkbox,
	RadioGroup,
	Radio,
	Skeleton,
} from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import type { SurveyAnswerProps } from "./types";

const SurveyPage = () => {
	const { data: surveyData, isLoading: surveyLoading } = useQuery({
		queryKey: ["survey-get"],
		queryFn: ({ signal }) =>
			getData<SurveyWithQuestions>({
				url: "survey",
				id: 1,
				signal,
				query:
					"include.questions.include.multipleChoice=true" +
					"&&include.questions.include.checkBox=true" +
					"&&include.questions.orderBy.order=asc",
			}),
	});

	const { mutateAsync: submitSurvey, isPending: submitting } = useMutation({
		mutationFn: async (data) =>
			postData({
				url: "/survey/submit",
				data,
			}),
	});

	const { register, handleSubmit, control, watch } =
		useForm<SurveyAnswerProps>();

	const onSubmit = (data: SurveyAnswerProps) => {
		const parsedData = {
			...data,
			questions: data.questions
				.filter((q: SurveyAnswerProps["questions"][number]) => {
					const answer = q.multipleChoice || q.checkBox || q.name;
					return answer !== undefined && answer !== "";
				})
				.map((q: SurveyAnswerProps["questions"][number]) => {
					const {
						id,
						multipleChoice,
						checkBox,
						name,
						checkBoxOther,
						multipleChoiceOther,
					} = q;
					const parsedCheckBox = JSON.stringify(checkBox);
					return {
						questionId: Number(id),
						answer: multipleChoice || parsedCheckBox || name,
						other: checkBoxOther || multipleChoiceOther,
					};
				}),
		};

		console.log("parsedData", parsedData.questions);

		// submitSurvey(data)
		//   .then(() => {
		//     alert('Survey submitted successfully!');
		//   })
		//   .catch((error) => {
		//     console.error('Submission error:', error);
		//   });
	};

	if (surveyLoading) return <Skeleton />;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<h1 className="text-2xl font-bold">{surveyData?.name}</h1>
			<span className="text-foreground-500">{surveyData?.description}</span>
			{surveyData?.questions.map((question, index) => {
				const checkbox = watch(`questions.${index}.checkBox`);
				const multipleChoice = watch(`questions.${index}.multipleChoice`);
				return (
					<div key={question.id} className="flex flex-col gap-2">
						{question.type === "ShortAnswer" && (
							<div className="bg-content1 p-4 rounded-lg">
								<Controller
									name={`questions.${index}.name`}
									control={control}
									rules={{
										required: question.required
											? "Campo obrigatório"
											: undefined,
									}}
									render={({ field, fieldState: { error } }) => (
										<Input
											label={question.name}
											labelPlacement="outside"
											placeholder="Resposta"
											id={field.name}
											type="text"
											onChange={field.onChange}
											name={field.name}
											value={field.value}
											isRequired={question.required}
											variant="bordered"
											color="primary"
											classNames={{
												label: "text-foreground-700 text-lg",
												input: "placeholder:opacity-0",
											}}
											isInvalid={!!error}
											errorMessage={error?.message}
										/>
									)}
								/>
							</div>
						)}
						<input
							{...register(`questions.${index}.id`)}
							type="hidden"
							value={question.id}
						/>
						{question.type === "CheckBox" && (
							<div className="relative flex flex-col gap-2 bg-content1 p-4 rounded-lg">
								<Controller
									key={question.id}
									name={`questions.${index}.checkBox`}
									control={control}
									rules={{
										required: question.required
											? "Campo obrigatório"
											: undefined,
									}}
									render={({ field, fieldState: { error } }) => (
										<CheckboxGroup
											label={question.name}
											value={field.value}
											onChange={field.onChange}
											isRequired={question.required}
											isInvalid={!!error}
											errorMessage={error?.message}
											classNames={{
												label: "text-foreground-700 text-lg",
											}}
										>
											{question.checkBox
												?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
												?.map((option) => (
													<Checkbox key={option.id} value={option.option}>
														{option.option}
													</Checkbox>
												))}
										</CheckboxGroup>
									)}
								/>
								{checkbox?.includes("Outro") && (
									<Controller
										name={`questions.${index}.checkBoxOther`}
										control={control}
										rules={{
											required: question.required
												? "Campo obrigatório"
												: undefined,
										}}
										render={({ field, fieldState: { error } }) => (
											<Input
												// isDisabled={
												// 	!getValues(`questions.${index}.checkBox`)?.includes(
												// 		"Outro",
												// 	)
												// }
												type="text"
												variant="bordered"
												color="primary"
												value={field.value}
												onChange={field.onChange}
												isRequired
												isInvalid={!!error}
												errorMessage={error?.message}
											/>
										)}
									/>
								)}
							</div>
						)}
						{question.type === "MultipleChoice" && (
							<div className="relative flex flex-col gap-2 bg-content1 p-4 rounded-lg">
								<Controller
									key={question.id}
									name={`questions.${index}.multipleChoice`}
									control={control}
									rules={{
										required: question.required
											? "Campo obrigatório"
											: undefined,
									}}
									render={({ field, fieldState: { error } }) => (
										<RadioGroup
											label={question.name}
											value={field.value}
											onChange={field.onChange}
											classNames={{
												label: "text-foreground-700 text-lg",
											}}
											isRequired={question.required}
											isInvalid={!!error}
											errorMessage={error?.message}
										>
											{question.multipleChoice
												?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
												?.map((choice) => (
													<Radio key={choice.id} value={choice.choice ?? ""}>
														{choice.choice}
													</Radio>
												))}
										</RadioGroup>
									)}
								/>
								{multipleChoice === "Outro" && (
									<Controller
										name={`questions.${index}.multipleChoiceOther`}
										control={control}
										rules={{
											required: question.required
												? "Campo obrigatório"
												: undefined,
										}}
										render={({ field, fieldState: { error } }) => (
											<Input
												type="text"
												variant="bordered"
												color="primary"
												value={field.value}
												onChange={field.onChange}
												isRequired
												isInvalid={!!error}
												errorMessage={error?.message}
											/>
										)}
									/>
								)}
							</div>
						)}
					</div>
				);
			})}
			<Button type="submit" disabled={submitting} className="mt-4">
				Enviar
			</Button>
		</form>
	);
};

export default SurveyPage;
