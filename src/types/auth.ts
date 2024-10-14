import type { User } from "@prisma/client";
import type { Session } from "next-auth";

export interface AxiosApiError<T> {
	error: keyof T;
	msg: string | string[];
	statusCode: number;
}

export interface AuthStoreProps {
	signed?: boolean;
	setSigned: (signed: boolean) => void;
	logout: () => Promise<void>;
}
export interface TokenProps {
	exp: number;
	iat: number;
	sessionId: number;
}

export type SessionProps = Session & { userData?: User };
