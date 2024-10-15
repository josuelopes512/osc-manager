import { authOptions } from "@/auth.config";
import api from "@/lib/api";
import type { NextApiResponse } from "next";
import NextAuth from "next-auth/next";

async function handler(req: any, res: NextApiResponse) {
	return await NextAuth(req, res, {
		...authOptions,
		callbacks: {
			...authOptions.callbacks,
			signIn: async ({ user, account, profile }) => {
				try {
					if (account) {
						account.userData = user as any;
						await api.post("/auth/login", { ...account });
					}
					return true;
				} catch (error: any) {
					console.error("signIn", error);
					if (error?.response.status === 403) {
						return "/account-blocked";
					}
					return false;
				}
			},
		},
	});
}

export { handler as GET, handler as POST };
