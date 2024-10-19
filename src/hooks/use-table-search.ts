import { create } from "zustand";

interface TableSearchProps {
	search: string;
	setSearch: (search: string) => void;
	data?: any[];
	setData: (data: any[]) => void;
}

export const useTableSearch = create<TableSearchProps>()((set, get) => ({
	search: "",
	setSearch: (search) => {
		set(() => ({ search }));
	},
	setData: (data) => {
		set(() => ({ data }));
	},
}));
