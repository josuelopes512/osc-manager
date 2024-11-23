import GraduationCapPlus from "@/assets/icons/GraduationCapPlus";
import RiSurveyFillPlus from "@/assets/icons/RiSurveyFillPlus";
import { BsFillHouseAddFill, BsFillHousesFill } from "react-icons/bs";
import { FaUserCog } from "react-icons/fa";
import { FaGraduationCap, FaUserPlus, FaUsers } from "react-icons/fa6";
import { MdOutlineAddTask, MdSpaceDashboard, MdTaskAlt } from "react-icons/md";
import { RiSurveyFill } from "react-icons/ri";

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
	return [
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
					icon: MdTaskAlt,
					submenus: [
						{
							href: "/projetos",
							label: "Todos projetos",
							Icon: MdTaskAlt,
						},
						{
							href: "/projetos/new",
							label: "Adicionar projeto",
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
}
