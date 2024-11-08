import { ModeToggle } from "@/components/admin-panel/mode-toggle";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { UserNav } from "@/components/admin-panel/user-nav";

export function Navbar() {
	return (
		<header className="sticky top-0 z-10 w-full shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
			<div className="mx-4 sm:mx-8 flex h-14 items-center">
				<div className="flex items-center space-x-4 lg:space-x-0">
					<SheetMenu />
				</div>
				<div className="flex flex-1 items-center justify-end">
					<ModeToggle />
					<UserNav />
				</div>
			</div>
		</header>
	);
}
