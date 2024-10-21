import type { PUTDefaultDTO } from "@/types/api";
import type { POSTSocialPlatformDTO } from "./post";

export interface PUTSocialPlatformDTO
	extends PUTDefaultDTO,
		POSTSocialPlatformDTO {}
