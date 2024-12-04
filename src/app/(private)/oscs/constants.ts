import type { ColumnProps } from "@/components/table/types";
import type { OSC, OSCAddress } from "@prisma/client";

export const columnsOSCs: ColumnProps<OSC & { address: OSCAddress }>[] = [
	{
		uid: "name",
		label: "Nome",
		sortable: true,
		filterable: true,
	},
	{
		uid: "address.street" as any,
		label: "Logradouro",
		sortable: true,
		filterable: true,
		renderCell: (item) => {
			const { address } = item;
			if (!address) return "-";
			const { street, number } = address;
			return `${street ?? ""} ${number ? `, ${number}` : ""}`.trim();
		},
	},
	{
		uid: "address.city" as any,
		label: "Cidade",
		sortable: true,
		filterable: true,
		renderCell: (item) => {
			const { address } = item;
			if (!address) return "-";
			return address ? `${address.city ?? ""}` : "-";
		},
	},

	{
		uid: "address.state" as any,
		label: "Estado",
		sortable: true,
		filterable: true,
		renderCell: (item) => {
			const { address } = item;
			return address ? `${address.state ?? ""}` : "-";
		},
	},
];
