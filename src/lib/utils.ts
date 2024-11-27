import type { ColumnProps } from "@/components/table/types";
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
