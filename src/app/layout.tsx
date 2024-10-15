import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./providers";

import "./globals.css";

const font = Montserrat({ weight: "400", subsets: ["latin"] });

const APP_NAME = "OSC Manager";
const APP_TITLE_TEMPLATE = "OSC Manager | %s";
const APP_DESCRIPTION = "OSC Manager | Gerenciamento de OSCs";

export const metadata: Metadata = {
	applicationName: APP_NAME,
	title: {
		default: APP_DESCRIPTION,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
};

export const viewport: Viewport = {
	themeColor: "#222",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt">
			<body className={font.className}>
				<Providers>
					{/* <main className="bg-background text-foreground">{children}</main> */}
					{children}
				</Providers>
			</body>
		</html>
	);
}
