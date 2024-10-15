"use client";
import { QueryClient, useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer, Zoom } from "react-toastify";

import { queryClientConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button, NextUIProvider } from "@nextui-org/react";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

let persister: any;
export function Providers({ children }: { children: React.ReactNode }) {
	const navigate = useRouter();
	const [isClient, setIsClient] = useState(false);
	const [queryClient, setQueryClient] = useState<QueryClient>();
	const { reset } = useQueryErrorResetBoundary();
	// const adBlockDetected = useDetectAdBlock()

	useEffect(() => {
		setIsClient(typeof window !== "undefined");
	}, []);

	useEffect(() => {
		if (isClient) {
			persister = createSyncStoragePersister({
				storage: window.localStorage,
			});
			setQueryClient(new QueryClient(queryClientConfig));
		}
	}, [isClient]);

	if (!isClient) {
		return null;
	}
	if (!queryClient) {
		return null;
	}

	// if (adBlockDetected) return <AdblockDetect />
	return (
		<ErrorBoundary
			onReset={reset}
			fallbackRender={({ resetErrorBoundary }: any) => (
				// <Layout>
				<div className="flex h-screen flex-col items-center justify-center">
					<h1 className="text-2xl font-bold">Ocorreu um erro</h1>
					<Button
						className="mt-4"
						onClick={() => {
							resetErrorBoundary();
						}}
					>
						Tentar novamente
					</Button>
				</div>
				// </Layout>
			)}
		>
			<NextUIProvider navigate={navigate.push}>
				<SessionProvider>
					<PersistQueryClientProvider
						client={queryClient}
						persistOptions={{ persister }}
						onSuccess={() => {
							// resume mutations after initial restore from localStorage was successful
							queryClient.resumePausedMutations().then(() => {
								queryClient.invalidateQueries();
							});
						}}
					>
						<NextThemesProvider attribute="class" defaultTheme="light">
							<ToastContainer
								pauseOnHover={false}
								pauseOnFocusLoss={false}
								position="top-center"
								autoClose={6000}
								hideProgressBar={false}
								newestOnTop
								closeOnClick
								transition={Zoom}
								rtl={false}
								draggable
								theme="dark"
								toastClassName={cn(
									"min-h-10 cursor-pointer justify-between",
									"overflow-hidden rounded-[25px] bg-gray-900 p-3 text-white",
									"md:mb-2 mb-8 md:m-0 m-4",
								)}
							/>
							{children}
						</NextThemesProvider>
					</PersistQueryClientProvider>
				</SessionProvider>
			</NextUIProvider>
		</ErrorBoundary>
	);
}
