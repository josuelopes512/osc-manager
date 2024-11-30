import type { Metadata } from "next";
import CardAvaliacao from "./cardAvaliacao";

export const metadata: Metadata = {
	title: "Avaliação",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="md:pt-8 md:pb-8 md:px-4 p-0">
			<CardAvaliacao>{children}</CardAvaliacao>
		</div>
	);
};

export default Layout;
