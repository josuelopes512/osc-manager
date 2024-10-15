import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AdminPanelLayout>
			<ContentLayout>{children}</ContentLayout>
		</AdminPanelLayout>
	);
}
