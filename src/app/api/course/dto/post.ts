import type { PUTDefaultDTO } from "@/types/api";

export interface POSTCourseDTO {
	name: string;
}
export interface PUTCourseDTO extends PUTDefaultDTO {
	name: string;
}
