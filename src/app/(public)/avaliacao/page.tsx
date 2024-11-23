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

	const { setValue, handleSubmit, control } = useForm<SurveyWithQuestions>();

	const { fields } = useFieldArray({
		control,
		name: "questions",
		keyName: "idField",
	});

	useEffect(() => {
		setValue("questions", surveyData?.questions as any);
	}, [surveyData, setValue]);

	const onSubmit = (data: any) => {
		console.log("data", data);
		console.log("fields", fields);

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
			{fields.map((field, index) => (
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
						<Controller
							key={field.id}
							name={`questions.${index}.checkBox.${field.id ?? 0}.option`}
							control={control}
							render={({ field: { onChange, value } }) => (
								<CheckboxGroup
									label={field.name}
									value={[value ?? ""]}
									onValueChange={onChange}
									className="bg-content1 p-4 rounded-lg"
								>
									{field.checkBox?.map((option) => (
										<Checkbox key={option.id} value={option.option}>
											{option.option}
										</Checkbox>
									))}
								</CheckboxGroup>
							)}
						/>
					)}
					{field.type === "MultipleChoice" && (
						<Controller
							key={field.id}
							name={`questions.${index}.multipleChoice.${field.id ?? 0}.choice`}
							control={control}
							render={({ field: { onChange, value } }) => (
								<RadioGroup
									label={field.name}
									className="bg-content1 p-4 rounded-lg"
									value={value}
									onValueChange={onChange}
								>
									{field.multipleChoice?.map((choice) => (
										<Radio key={choice.id} value={choice.choice ?? ""}>
											{choice.choice}
										</Radio>
									))}
								</RadioGroup>
							)}
						/>
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
