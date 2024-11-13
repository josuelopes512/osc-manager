import { cn } from "@nextui-org/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Aprovação de Usuários",
};

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}
