"use client";
import { cn } from "@/lib/utils";
import { Card, CardBody } from "@nextui-org/react";
import type { Metadata } from "next";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="md:pt-8 md:pb-8 md:px-4 p-0">
			<Card className="min-h-[calc(100dvh_-_130px)] w-full bg-background">
				<CardBody className="md:py-8 md:px-4 h-full">{children}</CardBody>
			</Card>
		</div>
	);
};

export default Layout;
