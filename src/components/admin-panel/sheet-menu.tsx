import { AiOutlineMenu } from "react-icons/ai";
import { LuPanelLeft } from "react-icons/lu";
import Link from "next/link";

import { Menu } from "@/components/admin-panel/menu";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export function SheetMenu() {
	return (
		<Sheet>
			<SheetTrigger className="lg:hidden" asChild>
				<Button className="h-8" variant="outline" size="icon">
					<AiOutlineMenu size={20} />
				</Button>
			</SheetTrigger>
			<SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
				<SheetHeader>
					<Button
						className="flex justify-center items-center pb-2 pt-1"
						variant="link"
						asChild
					>
						<Link href="/dashboard" className="flex items-center gap-2">
							<LuPanelLeft className="w-6 h-6 mr-1" />
							<SheetTitle className="font-bold text-lg">OSC Manager</SheetTitle>
						</Link>
					</Button>
				</SheetHeader>
				<Menu isOpen />
			</SheetContent>
		</Sheet>
	);
}
