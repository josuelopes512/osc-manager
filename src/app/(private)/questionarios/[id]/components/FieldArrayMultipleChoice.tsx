"use client";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { Controller, useFieldArray } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { FiCircle } from "react-icons/fi";
import type { NestedFieldArrayProps } from "../types";
import type { MultipleChoice, Question } from "@prisma/client";

export default function FieldArrayMultipleChoice({
	control,
	name,
}: NestedFieldArrayProps<
	Question & { multipleChoice: Partial<MultipleChoice>[] },
	"multipleChoice"
>) {
	const { fields, append, remove, insert } = useFieldArray({
		control,
		name: name,
	});

	return (
		<div className="flex flex-col gap-4">
			{fields
				.sort((a, b) => ((a.order ?? 0) > (b.order ?? 0) ? 1 : -1))
				.map((item, index) => (
					<div key={item.id} className="flex items-center gap-2">
						{item.choice !== "Outro" && (
							<Controller
								name={`${name}.${index}.choice`}
								control={control}
								rules={{ required: "Campo obrigatório" }}
								render={({ field, fieldState: { error } }) => (
									<Input
										label="Opção"
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
										startContent={<FiCircle size={20} />}
									/>
								)}
							/>
						)}
						{item.choice === "Outro" && (
							<Controller
								name={`${name}.${index}.choice`}
								control={control}
								render={({ field, fieldState: { error } }) => (
									<Input
										label="Outro"
										id={field.name}
										labelPlacement="outside-left"
										type="text"
										onChange={field.onChange}
										name={field.name}
										value=""
										variant="bordered"
										color="primary"
										classNames={{ mainWrapper: "w-full" }}
										isDisabled
										isInvalid={!!error}
										errorMessage={error?.message}
									/>
								)}
							/>
						)}
						<Tooltip
							content="Remover opção"
							placement="bottom-end"
							className="text-white"
							color="danger"
						>
							<Button
								type="button"
								color="danger"
								className="w-fit rounded-full text-main-white"
								onPress={() => remove(index)}
								isIconOnly
							>
								<FaTrash size={20} className="text-white" />
							</Button>
						</Tooltip>
					</div>
				))}
			<div className="flex items-center gap-2">
				<Button
					type="button"
					variant="ghost"
					className="w-fit"
					onPress={() => {
						const insertIndex = fields.findIndex(
							(item) => item.choice === "Outro",
						);
						insert(insertIndex === -1 ? fields.length : insertIndex, {
							choice: "",
							order: fields.length + 1,
						});
					}}
				>
					Adicionar opção
				</Button>
				{fields.findIndex((item) => item.choice === "Outro") === -1 && (
					<>
						ou
						<Button
							type="button"
							variant="ghost"
							className="w-fit"
							onPress={() => {
								append({
									choice: "Outro",
									order: fields.length + 1,
								});
							}}
						>
							Adicionar "outro"
						</Button>
					</>
				)}
			</div>
		</div>
	);
}
