import { parse } from "cookie";
import { withAuth } from "next-auth/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { PUBLIC_API_ROUTES, PUBLIC_ROUTES } from "./lib/routes";

function matchRoute(pathname: string, routes: string[]) {
	for (const route of routes) {
		if (
			new RegExp(`^${route}$`).test(pathname) ||
			pathname.startsWith(`${route}/`)
		) {
			return true;
		}
	}
	return false;
}

async function middleware(req: NextRequest) {
	const cookies = parse(req.headers.get("Cookie") || "");
	const signed =
		cookies["next-auth.session-token"] ||
		cookies["__Secure-next-auth.session-token"];

	const absoluteURL = new URL("/dashboard", req.nextUrl.origin);

	// check if user is approved

	// Handle maintenance mode
	if (process.env.MAINTENANCE === "true") {
		const maintenanceURL = new URL("/maintenance", req.nextUrl.origin);
		return NextResponse.redirect(maintenanceURL.toString());
	}

	if (req.nextUrl.pathname.startsWith("/api")) {
		const isPublicApiRoute = matchRoute(
			req.nextUrl.pathname,
			PUBLIC_API_ROUTES,
		);

		// If the API route is not public and there's no valid session token, redirect to login
		if (!isPublicApiRoute && !signed) {
			const loginURL = new URL("/login", req.nextUrl.origin);
			loginURL.searchParams.append(
				"redirect",
				encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search),
			);
			return NextResponse.redirect(loginURL.toString());
		}

		// If it's a public API route or the user is authenticated, proceed
		return NextResponse.next();
	}

	// Check if the request is for a public page
	const isPublicRoute = matchRoute(req.nextUrl.pathname, PUBLIC_ROUTES);

	// Redirect to login if the route is protected and the user is not authenticated
	if (!isPublicRoute && !signed) {
		const loginURL = new URL("/login", req.nextUrl.origin);
		loginURL.searchParams.append(
			"redirect",
			encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search),
		);
		return NextResponse.redirect(loginURL.toString());
	}

	// If the user is signed in and tries to access a public route, redirect them to the appropriate page
	if (isPublicRoute && signed) {
		const redirect = req.nextUrl.searchParams.get("redirect");
		if (redirect) absoluteURL.pathname = decodeURIComponent(redirect);
		if (req.nextUrl.pathname === "/") return NextResponse.next();
		if (req.nextUrl.pathname.includes("/avaliacao")) return NextResponse.next();

		return NextResponse.redirect(absoluteURL.toString());
	}

	return NextResponse.next();
}

export default withAuth(middleware, {
	callbacks: {
		authorized: async ({ req, token }) => {
			const path = req.nextUrl.pathname;
			if (!path.startsWith("/api")) {
				const isPublicRoute = matchRoute(path, PUBLIC_ROUTES);
				return !(!token && !isPublicRoute);
			}
			return true;
		},
	},
	pages: {
		signIn: "/login",
		error: "/auth/error",
	},
});
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!_next/static|_next/image|favicon.ico).*)",
	],
};
