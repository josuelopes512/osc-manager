import { prisma } from "@/app/api/prisma/prisma.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { User } from "@prisma/client";
import type { AuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			// authorization: {
			//   params: {
			//     prompt: 'consent',
			//     access_type: 'offline',
			//     response_type: 'code',
			//   },
			// },
		}),
	],
	session: {
		strategy: "jwt",
	},
	adapter: PrismaAdapter(prisma) as Adapter,

	pages: {
		signIn: "/login",
		error: "/auth/error",
		verifyRequest: "/auth/verify-request",
	},
	callbacks: {
		async jwt({ token, account }) {
			// Persist the OAuth access token to the token right after signin
			if (account) {
				token.expiresIn = (account.expires_at ?? 0) * 1000;
				token.userData = account.userData;
				token.idToken = account.id_token;
			}

			// console.log('JWT', token)

			// Return previous token if the access token has not expired yet
			if (Date.now() < (token.expiresIn as number)) {
				return token;
			}
			return token;

			// Access token has expired, try to update it
			// return refreshAccessToken(token)
		},
		async session({ session, token }) {
			session.userData = token.userData;
			// session.error = token.error
			session.expiresIn = token.expiresIn;
			session.idToken = token.idToken;

			return session;
		},
		// signIn({ user, account, profile, email, credentials }) {
		// 	console.log("signIn", { user, account, profile, email, credentials });
		// 	return true;
		// },
	},
};

declare module "next-auth" {
	interface Session {
		expiresIn?: number;
		userData?: User;
		idToken?: string;
	}
	interface Account {
		userData?: User;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		expiresIn?: number;
		userData?: User;
		idToken?: string;
	}
}
