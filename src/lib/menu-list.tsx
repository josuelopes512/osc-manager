import BsFillHousesFillPlus from "@/assets/icons/BsFillHousesFillPlus";
import FaClipboardCheckPlus from "@/assets/icons/FaClipboardCheckPlus";
import RiSurveyFillPlus from "@/assets/icons/RiSurveyFillPlus";
import { BsFillHousesFill } from "react-icons/bs";
import { FaClipboardCheck, FaUserCog } from "react-icons/fa";
import { FaGraduationCap, FaUserPlus, FaUsers } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { RiExportFill, RiImportFill, RiSurveyFill } from "react-icons/ri";

export type Submenu = {
	href: string;
	label: string;
	Icon: any;
	active?: boolean;
};

type Menu = {
	href: string;
	label: string;
	active?: boolean;
	icon: any;
	submenus?: Submenu[];
};

type Group = {
	groupLabel: string;
	menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
	const menuList = [
		{
			groupLabel: "Painel",
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
					icon: FaClipboardCheck,
					submenus: [
						{
							href: "/projetos",
							label: "Todos projetos",
							Icon: FaClipboardCheck,
						},
						{
							href: "/projetos/new",
							label: "Adicionar projeto",
							Icon: FaClipboardCheckPlus,
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
							Icon: BsFillHousesFillPlus,
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
							Icon: RiSurveyFillPlus,
						},
					],
				},
				{
					href: "/questionarios",
					label: "Questionários",
					icon: RiSurveyFill,
					submenus: [
						{
							href: "/questionarios",
							label: "Todos Questionários",
							Icon: RiSurveyFill,
						},
						{
							href: "/questionarios/new",
							label: "Adicionar Questionário",
							Icon: RiSurveyFillPlus,
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

	if (process.env.NEXT_PUBLIC_USE_IMPORT_DATA === "true") {
		menuList.push({
			groupLabel: "Importar/Exportar",
			menus: [
				{
					href: "/data/importar",
					label: "Importar",
					icon: RiImportFill,
				},
				{
					href: "/data/exportar",
					label: "Exportar",
					icon: RiExportFill,
				},
			],
		});
	}

	return menuList;
}
