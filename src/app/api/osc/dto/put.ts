import type { OSCSocial } from "@prisma/client";

export interface PUTOSCDTO {
	name?: string;
	location?: string;
	oscSocials?: {
		create?: Omit<OSCSocial, "id" | "oscId">[];
		update?: (Omit<OSCSocial, "oscId"> & { id: number })[];
		delete?: number[];
	};
}
