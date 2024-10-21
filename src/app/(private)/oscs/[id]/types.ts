import type { OSC } from "@prisma/client";

export type OSCFormProps = Omit<OSC, "courseId"> & {
	courseId: string;
};
