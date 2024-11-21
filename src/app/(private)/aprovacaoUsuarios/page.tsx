"use client";

import type { PUTUserApprovalDTO } from "@/app/api/user/approval/dto/put";
import Table from "@/components/table";
import type { ColumnProps } from "@/components/table/types";
import {
	deleteData,
	getData,
	putData,
	toastErrorsApi,
} from "@/lib/functions.api";
import type { PutData } from "@/types/api";
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
import type { User } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";
import { columnsUserApprovals } from "./constants";

export default function UserApprovalList() {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["user-get"],
		queryFn: ({ signal }) =>
			getData<User[]>({
				url: "/user",
				signal,
				query: "where.approved=false",
			}),
	});

	const { mutateAsync: mutatePut, isPending: loadingPut } = useMutation({
		mutationFn: async (val: PutData<PUTUserApprovalDTO>) => putData(val),
		mutationKey: ["user-approval-put"],
	});

	const [emailUserApproval, setEmailUserApproval] = useState<string>();

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const aproveUser = (id: string) => {
		mutatePut({
			url: "/user/approval",
			id,
			data: {
				approved: true,
			},
		})
			.then(() => {
				toast.success("Usuário aprovado com sucesso");
				void refetch();
			})
			.catch((err) => {
				toastErrorsApi(err);
			});
	};

	const finalColumns: ColumnProps<User>[] = [
		...columnsUserApprovals,
		{
			uid: "actions",
			label: "Ações",
			renderCell: (item) => (
				<div className="relative flex cursor-pointer items-center justify-end gap-5">
					<Tooltip content="Aprovar" placement="bottom-end" color="success">
						<Button
							isIconOnly
							color="success"
							className="rounded-full"
							onClick={() => {
								setEmailUserApproval(item.email);
								onOpen();
							}}
							title="Aprovar"
						>
							<FaCheck size={20} />
						</Button>
					</Tooltip>
				</div>
			),
		},
	];

	const loading = isLoading || loadingPut;

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
								Tem certeza que deseja aprovar o usuário?
							</ModalHeader>
							<ModalBody>
								<div className={"flex flex-col gap-2 text-default-600"}>
									Você está prestes a aprovar o usuário, deseja continuar?
								</div>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Não
								</Button>
								<Button
									color="primary"
									onPress={() => {
										if (!emailUserApproval) return;
										aproveUser(emailUserApproval);
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
