import type { OSC, OSCAddress, OSCSocial } from "@prisma/client";

export type OSCFormProps = OSC & {
	oscSocials: (Omit<Partial<OSCSocial>, "socialPlatformId"> & {
		socialPlatformId?: string;
	})[];
	address?: Partial<OSCAddress>;
};
