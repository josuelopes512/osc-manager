import { Role } from "@prisma/client";


export const users = [
	{
		id: "1",
		name: "Levi Gleik",
		email: "leviacedo1@gmail.com",
		approved: true,
		role: Role.ADMIN,
	},
	{
		id: "2",
		name: "Josué Lopes",
		email: "cmastercode77@gmail.com",
		approved: true,
		role: Role.ADMIN,
	},
	{
		id: "3",
		name: "Caio Portela",
		email: "ccarvalho451@gmail.com",
		approved: true,
		role: Role.ADMIN,
	},
];
