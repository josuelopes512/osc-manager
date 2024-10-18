import { Navbar } from "@/components/admin-panel/navbar";
import { Card, CardContent } from "../ui/card";

interface ContentLayoutProps {
	children: React.ReactNode;
}

export function ContentLayout({ children }: ContentLayoutProps) {
	return (
		<>
			<Navbar />
			<div className="pt-8 pb-8 px-4 sm:px-8">
				<Card className="min-h-[calc(100dvh_-_130px)] w-full">
					<CardContent className="pt-8 px-4 h-full">{children}</CardContent>
				</Card>
			</div>
		</>
	);
}
