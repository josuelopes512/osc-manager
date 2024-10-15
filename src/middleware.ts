import { parse } from "cookie";
import { withAuth } from "next-auth/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { PUBLIC_ROUTES, PUBLIC_ROUTES_BACK } from "./lib/routes";

async function middleware(req: NextRequest) {
	const cookies = parse(req.headers.get("Cookie") || "");
	// console.log('Cookies:', cookies)
	const signed =
		cookies["next-auth.session-token"] ||
		cookies["__Secure-next-auth.session-token"];

	const absoluteURL = new URL("/", req.nextUrl.origin);

	if (process.env.MAINTENANCE === "true") {
		const maintenanceURL = new URL("/maintenance", req.nextUrl.origin);
		return NextResponse.redirect(maintenanceURL.toString());
	}

	// console.log('Pathname:', req.nextUrl.pathname)
	// console.log('isPublicRoute:', !isProtectedRoute)
	// console.log('isProtectedRoute:', isProtectedRoute)
	// console.log('signed:', signed)

	if (req.nextUrl.pathname.startsWith("/api")) {
		return NextResponse.next();
	}

	const isPublicRoute = PUBLIC_ROUTES.includes(req.nextUrl.pathname);

	if (!isPublicRoute && !signed) {
		const loginURL = new URL("/auth/login", req.nextUrl.origin);
		loginURL.searchParams.append(
			"redirect",
			encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search),
		);
		return NextResponse.redirect(loginURL.toString());
	}

	if (isPublicRoute && signed) {
		const redirect = req.nextUrl.searchParams.get("redirect");
		// console.log('Redirect:', redirect)
		if (redirect) absoluteURL.pathname = decodeURIComponent(redirect);

		return NextResponse.redirect(absoluteURL.toString());
	}

	return NextResponse.next();
}

export default withAuth(middleware, {
	callbacks: {
		authorized: async ({ req, token }) => {
			// console.log('Authorized:', req.nextUrl.pathname)
			const path = req.nextUrl.pathname;
			const isPublicRoute = PUBLIC_ROUTES_BACK.includes(req.nextUrl.pathname);

			return !(!token && !isPublicRoute);
		},
	},
	pages: {
		signIn: "/",
		error: "/auth/error",
	},
});

export const config = {
	matcher: [
		"/",
		"/chests",
		"/chests/:path*",
		"/referral",
		"/net",
		"/net/:path*",
		"/ranking",
		"/ranking/:path*",
		"/wallet",
		"/wallet/:path*",
		"/task",
		"/task/:path*",
		"/auth/login",
		"/api/ad/:path*",
		"/api/wallet/",
	],
};
