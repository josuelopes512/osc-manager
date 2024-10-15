import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Alunos",
};

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}
