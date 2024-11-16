import HeaderTable from "@/components/ui/header.table";
import { columnsFilterable } from "@/lib/utils";
import type { Metadata } from "next";
import { columnsOSCs } from "./constants";

export const metadata: Metadata = {
	title: "OSCs",
};

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<HeaderTable
				filterColumns={columnsFilterable(columnsOSCs)}
				path={"oscs"}
				defaultText="OSC"
				newText="Nova OSC"
			/>
			{children}
		</>
	);
}
