"use client";
import { Card, CardBody } from "@nextui-org/react";

const CardAvaliacao = ({ children }: { children: React.ReactNode }) => {
	return (
		<Card className="min-h-[calc(100dvh_-_130px)] w-full bg-background">
			<CardBody className="md:py-8 md:px-4 h-full">{children}</CardBody>
		</Card>
	);
};

export default CardAvaliacao;
