"use client";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { Controller, useFieldArray } from "react-hook-form";
import { FaTrash, FaRegSquare } from "react-icons/fa";
import type { NestedFieldArrayProps } from "../types";
import type { CheckBox, Question } from "@prisma/client";

export default function FieldArrayCheckBox({
	control,
	name,
}: NestedFieldArrayProps<
	Question & { CheckBox: Partial<CheckBox>[] },
	"CheckBox"
>) {
	const { fields, append, remove, insert } = useFieldArray({
		control,
		name: name,
	});

	return (
		<div className="flex flex-col gap-4 col-span-4">
			{fields
				.sort((a, b) => ((a.order ?? 0) > (b.order ?? 0) ? 1 : -1))
				.map((item, index) => (
					<div key={item.id} className="flex items-center gap-2">
						{item.option !== "Outro" && (
							<Controller
								name={`${name}.${index}.option`}
								control={control}
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
										isInvalid={!!error}
										errorMessage={error?.message}
										startContent={<FaRegSquare size={20} />}
									/>
								)}
							/>
						)}
						{item.option === "Outro" && (
							<Controller
								name={`${name}.${index}.option`}
								control={control}
								render={({ field, fieldState: { error } }) => (
									<Input
										label="Outro"
										labelPlacement="outside-left"
										id={field.name}
										type="text"
										onChange={field.onChange}
										name={field.name}
										value={""}
										variant="bordered"
										color="primary"
										isDisabled
										isInvalid={!!error}
										classNames={{ mainWrapper: "w-full" }}
										errorMessage={error?.message}
									/>
								)}
							/>
						)}
						<Tooltip
							content="Deletar"
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
						if (
							fields.length > 0 &&
							fields[fields.length - 1].option === "Outro"
						) {
							remove(fields.length - 1);
						}
						append({
							option: "",
							order: fields.length + 1,
						});
					}}
				>
					Adicionar opção
				</Button>
				{fields.findIndex((item) => item.option === "Outro") === -1 && (
					<>
						ou
						<Button
							type="button"
							variant="ghost"
							className="w-fit"
							onPress={() => {
								append({
									option: "Outro",
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
