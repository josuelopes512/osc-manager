import type { Submenu } from "@/components/admin-panel/collapse-menu-button";
import {
	Bookmark,
	LayoutGrid,
	type LucideIcon,
	Plus,
	Settings,
	SquarePen,
	Tag,
	Users,
} from "lucide-react";

type Menu = {
	href: string;
	label: string;
	active?: boolean;
	icon: LucideIcon;
	submenus?: Submenu[];
};

type Group = {
	groupLabel: string;
	menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
	return [
		{
			groupLabel: "",
			menus: [
				{
					href: "/dashboard",
					label: "Dashboard",
					icon: LayoutGrid,
					submenus: [],
				},
			],
		},
		{
			groupLabel: "Gerenciamento",
			menus: [
				{
					href: "",
					label: "OSCS",
					icon: SquarePen,
					submenus: [
						{
							href: "/chests",
							label: "Todas OSCs",
							Icon: Bookmark,
						},
						{
							href: "/oscs/new",
							label: "Adicionar OSC",
							Icon: Plus,
						},
					],
				},
				{
					href: "/alunos",
					label: "Alunos",
					icon: Users,
				},
			],
		},
	];
}
