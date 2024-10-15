import Loading from "@/app/components/loading";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Login",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Suspense fallback={<Loading />}>{children}</Suspense>
		</>
	);
};

export default Layout;
