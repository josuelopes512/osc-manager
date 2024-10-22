import type { ColumnProps } from "@/components/table/types";
import type { OSC } from "@prisma/client";

export const columnsOSCs: ColumnProps<OSC>[] = [
	{
		uid: "name",
		label: "Nome",
		sortable: true,
		filterable: true,
	},
	{
		uid: "location",
		label: "Localização",
		sortable: true,
		filterable: true,
	},
];
