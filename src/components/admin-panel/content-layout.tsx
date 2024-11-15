"use client";
import { Navbar } from "@/components/admin-panel/navbar";
import { cn } from "@/lib/utils";
import { Card, CardBody } from "@nextui-org/react";

interface ContentLayoutProps {
	children: React.ReactNode;
}

export function ContentLayout({ children }: ContentLayoutProps) {
	return (
		<>
			<Navbar />
			<div className="md:pt-8 md:pb-8 md:px-4 p-0">
				<Card className="min-h-[calc(100dvh_-_130px)] w-full bg-background">
					<CardBody className="md:py-8 md:px-4 h-full">
						<div
							className={cn(
								"relative z-0 flex flex-col justify-between gap-4 bg-content1 p-4",
								"max-h-[calc(100dvh-8em)] w-full overflow-auto rounded-large shadow-small hidden md:flex",
							)}
						>
							{children}
						</div>
						<div className="md:hidden flex flex-col gap-4">{children}</div>
					</CardBody>
				</Card>
			</div>
		</>
	);
}
