import type { OSC, OSCSocial } from "@prisma/client";

export type OSCFormProps = OSC & {
	oscSocials: (Omit<Partial<OSCSocial>, "socialPlatformId"> & {
		socialPlatformId?: string;
	})[];
};
