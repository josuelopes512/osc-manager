import { prisma } from "@/app/api/prisma/prisma.config";
import api from "@/lib/api";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Cookie from "js-cookie";
import type { Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

async function getUser(email: string, password: string): Promise<any> {
	return {
		id: 1,
		name: "test user",
		email: email,
		password: password,
	};
}

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "password", type: "password" },
			},
			async authorize(credentials) {
				const user = await getUser(
					credentials.email as string,
					credentials.password as string,
				);

				return user ?? null;
			},
		}),
	],

	adapter: PrismaAdapter(prisma) as Adapter,

	callbacks: {
		// async jwt({ token, account }) {
		// 	// Persist the OAuth access token to the token right after signin
		// 	if (account) {
		// 		// token.expiresIn = (account.expires_at ?? 0) * 1000;
		// 		token.userData = account.userData;
		// 		// token.idToken = account.id_token;
		// 	}
		// 	// console.log('JWT', token)
		// 	// Return previous token if the access token has not expired yet
		// 	if (Date.now() < (token.exp as number)) {
		// 		return token;
		// 	}
		// 	return token;
		// 	// Access token has expired, try to update it
		// 	// return refreshAccessToken(token)
		// },
		// async session({ session, token }) {
		// 	session.userData = token.userData as any;
		// 	// session.error = token.error
		// 	// session.expiresIn = token.expiresIn;
		// 	// session.idToken = token.idToken;
		// 	return session;
		// },
		// signIn: async ({ user, account, profile }) => {
		// 	try {
		// 		if (account) {
		// 			account.userData = user as any;
		// 			await api.post("/auth/login", account);
		// 		}
		// 		return true;
		// 	} catch (error: any) {
		// 		console.error("signIn", error);
		// 		if (error?.response.status === 403) {
		// 			return "/account-blocked";
		// 		}
		// 		return false;
		// 	}
		// },
	},
	pages: {
		signIn: "/login",
		error: "/auth/error",
		verifyRequest: "/auth/verify-request",
	},
});

declare module "next-auth" {
	// interface JWT {
	// 	idToken: string;
	// 	expiresIn: number;
	// 	error?: "RefreshTokenError";
	// }
	interface Session {
		expiresIn?: number;
		userData?: {
			id: number;
			name: string;
			email: string;
		};
		idToken?: string;
	}
	interface Account {
		userData?: {
			id: number;
			name: string;
			email: string;
		};
	}
}
