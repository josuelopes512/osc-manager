import GraduationCapPlus from "@/assets/icons/GraduationCapPlus";
import { Image } from "@nextui-org/react";
import { Bookmark, LayoutGrid, Plus, SquarePen, Users } from "lucide-react";
import { BsFillHouseAddFill, BsFillHousesFill } from "react-icons/bs";
import { FaTasks, FaUserCog } from "react-icons/fa";
import {
	FaGraduationCap,
	FaSquare,
	FaUserPlus,
	FaUsers,
} from "react-icons/fa6";
import type { IconType } from "react-icons/lib";
import { MdOutlineAddTask, MdSpaceDashboard, MdTaskAlt } from "react-icons/md";

export type Submenu = {
	href: string;
	label: string;
	Icon: React.ReactNode | IconType;
	active?: boolean;
};

type Menu = {
	href: string;
	label: string;
	active?: boolean;
	icon: React.ReactNode | IconType;
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
					label: "Projetos",
					icon: MdTaskAlt,
					submenus: [
						{
							href: "/projetos",
							label: "Todos prjetos",
							Icon: MdTaskAlt,
						},
						{
							href: "/projetos/new",
							label: "Adicionar prjeto",
							Icon: MdOutlineAddTask,
						},
					],
				},
				{
					href: "",
					label: "OSCS",
					icon: BsFillHousesFill,
					submenus: [
						{
							href: "/oscs",
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
				{
					href: "/cursos",
					label: "Cursos",
					icon: FaGraduationCap,
					submenus: [
						{
							href: "/cursos",
							label: "Todos Cursos",
							Icon: FaGraduationCap,
						},
						{
							href: "/cursos/new",
							label: "Adicionar Curso",
							Icon: () => <GraduationCapPlus />,
						},
					],
				},
			],
		},
		{
			groupLabel: "Usuários",
			menus: [
				{
					href: "/aprovacaoUsuarios",
					label: "Aprovar usuário",
					icon: FaUserCog,
				},
			],
		},
	];
}
