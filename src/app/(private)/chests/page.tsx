"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function Home() {
	const { data } = useSession();
	const router = useRouter();

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
				<h1>WELCOME, {data?.userData?.name}</h1>
			</footer>
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
	);
}
