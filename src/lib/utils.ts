import type { ColumnProps } from "@/components/table/types";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export const columnsFilterable = <T extends Record<string, any>>(
	columns: ColumnProps<T>[],
) => {
	return columns
		.filter((column) => column.filterable)
		.map((column) => ({ uid: column.uid, label: column.label }));
};

export const capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const delay = async (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export interface CEPProps {
	cep: string;
	logradouro: string;
	complemento: string;
	bairro: string;
	localidade: string;
	uf: string;
	ibge: string;
	gia: string;
	ddd: string;
	siafi: string;
}

export const getCEP = async (cep: string): Promise<CEPProps> => {
	const { data } = await axios.get<CEPProps>(
		`https://viacep.com.br/ws/${cep}/json/`,
	);
	return data;
};
