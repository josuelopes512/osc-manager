import HeaderTable from "@/components/ui/header.table";
import { columnsFilterable } from "@/lib/utils";
import type { Metadata } from "next";
import { columnsUserApprovals } from "./constants";

export const metadata: Metadata = {
	title: "Aprovação de Usuários",
};

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<HeaderTable
				filterColumns={columnsFilterable(columnsUserApprovals)}
				path={"aprovacaoUsuarios"}
				defaultText="Usuário"
				newItem={false}
			/>
			{children}
		</>
	);
}
