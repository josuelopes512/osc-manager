import type { Submenu } from "@/components/admin-panel/collapse-menu-button";
import { Bookmark, LayoutGrid, Plus, SquarePen, Users } from "lucide-react";
import { BsFillHouseAddFill, BsFillHousesFill } from "react-icons/bs";
import { FaSquare, FaUserPlus, FaUsers } from "react-icons/fa6";
import type { IconType } from "react-icons/lib";
import { MdSpaceDashboard } from "react-icons/md";

type Menu = {
	href: string;
	label: string;
	active?: boolean;
	icon: IconType;
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
					icon: MdSpaceDashboard,
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
					icon: BsFillHousesFill,
					submenus: [
						{
							href: "/chests",
							label: "Todas OSCs",
							Icon: BsFillHousesFill,
						},
						{
							href: "/oscs/new",
							label: "Adicionar OSC",
							Icon: BsFillHouseAddFill,
						},
					],
				},
				{
					href: "/alunos",
					label: "Alunos",
					icon: FaUsers,
					submenus: [
						{
							href: "/alunos",
							label: "Todos Alunos",
							Icon: FaUsers,
						},
						{
							href: "/alunos/new",
							label: "Adicionar Aluno",
							Icon: FaUserPlus,
						},
					],
				},
			],
		},
	];
}
