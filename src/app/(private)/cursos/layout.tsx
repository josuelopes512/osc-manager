import HeaderTable from "@/components/ui/header.table";
import { columnsFilterable } from "@/lib/utils";
import type { Metadata } from "next";
import { columnsCourses } from "./constants";

export const metadata: Metadata = {
	title: "Cursos",
};

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<HeaderTable
				filterColumns={columnsFilterable(columnsCourses)}
				path={"cursos"}
				defaultText="Curso"
			/>
			{children}
		</>
	);
}
