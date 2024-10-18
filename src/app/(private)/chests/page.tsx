"use client";
import { Card, CardContent } from "@/components/ui/card";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";

export default function Home() {
	const { data } = useSession();
	const router = useRouter();

	return (
		<Card className="rounded-lg border-none mt-6">
			<CardContent className="p-6">
				<div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
					<div className="flex flex-col relative">
						<div className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
							<h1>WELCOME, {data?.userData?.name}</h1>
						</div>
						<button
							className="btn btn-primary"
							type="button"
							onClick={() => signOut({ callbackUrl: "/" })}
						>
							Click here to logout
						</button>
						<button
							className="btn btn-secondary"
							type="button"
							onClick={() => router.back()}
						>
							Go Back
						</button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
