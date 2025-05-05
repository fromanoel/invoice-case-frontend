import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: "/", whenAuthenticated: "redirect" },
  { path: "/sign-up", whenAuthenticated: "redirect" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("access_token")?.value;
  const response = NextResponse.next();
  if (process.env.NODE_ENV === "production") {
    response.cookies.delete("__next_hmr_refresh_hash__");
  }

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    return NextResponse.redirect(redirectUrl);
  }
  return response;
}
export const config: MiddlewareConfig = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
