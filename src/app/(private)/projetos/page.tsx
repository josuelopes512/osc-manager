"use client";

import Table from "@/components/table";
import type { ColumnProps } from "@/components/table/types";
import { deleteData, getData, toastErrorsApi } from "@/lib/functions.api";
import { capitalize } from "@/lib/utils";
import type { DeleteData } from "@/types/api";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
	useDisclosure,
} from "@nextui-org/react";
import type { OSC, Project, Semester } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { columnsProjects } from "./constants";

export default function ProjectList() {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["project-get"],
		queryFn: ({ signal }) =>
			getData<(Project & { semester: Semester; osc: OSC })[]>({
				url: "/project",
				signal,
				query: "include.semester=true&&include.osc=true&orderBy.name=asc",
			}),
		select: (data) =>
			data.map((item) => ({
				...item,
				name: capitalize(item.name),
			})),
	});

	const { mutateAsync: mutateDelete, isPending: loadingDelete } = useMutation({
		mutationFn: async (val: DeleteData) => deleteData(val),
		mutationKey: ["project-delete"],
	});

	const router = useRouter();

	const [itemDelete, setItemDelete] = useState<number>();

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const deleteItem = (id: number) => {
		mutateDelete({
			url: "/project",
			id: id,
		})
			.then(() => {
				toast.success("Projeto deletado com sucesso");
				void refetch();
			})
			.catch((err) => {
				toastErrorsApi(err);
			});
	};

	const finalColumns: ColumnProps<
		Project & { semester: Semester; osc: OSC }
	>[] = [
		...columnsProjects,
		{
			uid: "actions",
			label: "Ações",
			renderCell: (item) => (
				<div className="relative flex cursor-pointer items-center justify-end gap-5">
					<Tooltip content="Editar" placement="bottom-end" color="secondary">
						<Button
							isIconOnly
							color="primary"
							className="rounded-full"
							onClick={() => router.push(`projetos/${item.id}`)}
							title="Editar"
						>
							<FaPencilAlt size={20} />
						</Button>
					</Tooltip>
					<Tooltip content="Deletar" placement="bottom-end" color="danger">
						<Button
							isIconOnly
							color="danger"
							className="rounded-full"
							onClick={() => {
								setItemDelete(item.id);
								onOpen();
							}}
							title="Deletar"
						>
							<FaTrash size={20} />
						</Button>
					</Tooltip>
				</div>
			),
		},
	];

	const loading = isLoading || loadingDelete;

	return (
		<>
			<Table data={data} columns={finalColumns} loading={loading} />
			<Modal
				isOpen={isOpen}
				backdrop="opaque"
				classNames={{
					backdrop: "blur-md",
				}}
				onOpenChange={onOpenChange}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="mt-4 flex flex-col gap-1">
								Tem certeza que deseja deletar o curso?
							</ModalHeader>
							<ModalBody>
								<div className={"flex flex-col gap-2 text-default-600"}>
									Você está prestes a deletar o curso, deseja continuar?
								</div>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Não
								</Button>
								<Button
									color="primary"
									onPress={() => {
										if (!itemDelete) return;
										deleteItem(itemDelete);
										onClose();
									}}
								>
									Sim
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
