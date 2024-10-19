import type { ColumnProps } from "@/app/components/table/types";
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
