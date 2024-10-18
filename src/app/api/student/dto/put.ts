import type { PUTDefaultDTO } from "@/types/api";
import type { POSTStudentDTO } from "./post";

export interface PUTStudentDTO extends PUTDefaultDTO, POSTStudentDTO {}
