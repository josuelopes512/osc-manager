import type { OSCAddress, OSCSocial } from "@prisma/client";

export interface POSTOSCDTO {
	name: string;
	location: string;
	oscSocials: {
		create: Omit<OSCSocial, "id" | "oscId">[];
	};
	address?: OSCAddress;
}
