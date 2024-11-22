"use client";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { Controller, useFieldArray } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { FiCircle } from "react-icons/fi";
import type { NestedFieldArrayProps } from "../types";

export default function FieldArrayMultipleChoice({
	control,
	name,
}: NestedFieldArrayProps<any>) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: name,
	});

	return (
		<div className="flex flex-col gap-4">
			{fields.map((item, index) => (
				<div key={item.id} className="flex items-center gap-2">
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
							onClick={() => remove(index)}
							isIconOnly
						>
							<FaTrash size={20} className="text-white" />
						</Button>
					</Tooltip>
				</div>
			))}
			<Button
				type="button"
				variant="ghost"
				className="w-fit"
				onClick={() => {
					append({
						choice: "",
					});
				}}
			>
				Adicionar opção
			</Button>
		</div>
	);
}
