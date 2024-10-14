import { authConfig } from "@/auth.config";
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from "@/lib/routes";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const { nextUrl } = req;

	const isAuthenticated = !!req.auth;
	const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

	console.log("------------------------------------------------");

	console.log("isAuthenticated", isAuthenticated);
	console.log("isPublicRoute", isPublicRoute);
	console.log("nextUrl", nextUrl);

	if (isPublicRoute && isAuthenticated)
		return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

	if (!isAuthenticated && !isPublicRoute)
		return Response.redirect(new URL(ROOT, nextUrl));
});

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
