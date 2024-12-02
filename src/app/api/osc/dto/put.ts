import type { OSCAddress, OSCSocial } from "@prisma/client";

export interface PUTOSCDTO {
	name?: string;
	oscSocials?: {
		create?: Omit<OSCSocial, "id" | "oscId">[];
		update?: (Omit<OSCSocial, "oscId"> & { id: number })[];
		delete?: number[];
	};
	address?: OSCAddress;
}
