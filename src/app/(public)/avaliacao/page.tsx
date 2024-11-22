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
import { Controller, useFieldArray, useForm } from "react-hook-form";

const SurveyPage = () => {
	const { data: surveyData, isLoading: surveyLoading } = useQuery({
		queryKey: ["survey-get"],
		queryFn: ({ signal }) =>
			getData<SurveyWithQuestions>({
				url: "survey",
				id: 5,
				signal,
				query:
					"include.questions.include.multipleChoice=true&&include.questions.include.checkBox=true",
			}),
	});

	const { mutateAsync: submitSurvey, isPending: submitting } = useMutation({
		mutationFn: async (data) =>
			postData({
				url: "/survey/submit",
				data,
			}),
	});

	const { handleSubmit, control } = useForm<SurveyWithQuestions>();

	const { fields } = useFieldArray({
		control,
		name: "questions",
	});

	const onSubmit = (data: any) => {
		console.log(fields);

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
			{surveyData?.questions.map((field, index) => (
				<div key={field.id} className="flex flex-col gap-2">
					{field.type === "ShortAnswer" && (
						<div className="bg-content1 p-4 rounded-lg">
							{field.name}
							<Controller
								name={`questions.${index}.name`}
								control={control}
								render={({ field, fieldState: { error } }) => (
									<Input
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
								)}
							/>
						</div>
					)}
					{field.type === "CheckBox" && (
						<CheckboxGroup
							label={field.name}
							className="bg-content1 p-4 rounded-lg"
						>
							{field.checkBox?.map((option) => (
								<Controller
									key={option.id}
									name={`questions.${index}.checkBox.${option.id ?? 0}.option`}
									control={control}
									render={({ field: { onChange, value } }) => (
										<Checkbox value={value} onChange={onChange}>
											{option.option}
										</Checkbox>
									)}
								/>
							))}
						</CheckboxGroup>
					)}
					{field.type === "MultipleChoice" && (
						<RadioGroup
							label={field.name}
							className="bg-content1 p-4 rounded-lg"
						>
							{field.multipleChoice?.map((option) => (
								<Controller
									key={option.id}
									name={`questions.${index}.multipleChoice.${option.id ?? 0}.choice`}
									control={control}
									render={({ field: { onChange, value } }) => (
										<Radio value={value ?? ""} onChange={onChange}>
											{option.choice}
										</Radio>
									)}
								/>
							))}
						</RadioGroup>
					)}
				</div>
			))}
			<Button type="submit" disabled={submitting} className="mt-4">
				Submit
			</Button>
		</form>
	);
};

export default SurveyPage;
