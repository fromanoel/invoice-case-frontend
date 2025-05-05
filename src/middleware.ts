import jwt from "jsonwebtoken";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  {path: "/", whenAuthenticated: 'redirect'},
  {path: "/sign-up", whenAuthenticated: 'redirect'},

]as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find(route => route.path === path);
  const authToken = request.cookies.get('access_token')?.value;

  if(!authToken && publicRoute) {
    return NextResponse.next();
  }

  if(!authToken && !publicRoute){
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if(authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    return NextResponse.redirect(redirectUrl);
  }

//   if (authToken && !publicRoute) {
//     try {
//       // Decodifica o token para verificar a expiração
//       const decodedToken = jwt.decode(authToken) as { exp?: number };
  
//       // Loga o token decodificado para inspecionar o conteúdo
//       console.log("Decoded token:", decodedToken);

      
  
//       if (decodedToken?.exp && Date.now() >= decodedToken.exp * 1000) {
//         // Token expirado, remove o cookie e redireciona para login
//         const response = NextResponse.redirect(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE);
//         response.cookies.delete("access_token");
//         return response;
//       }
//     } catch (error) {
//       console.error("Error decoding token:", error);
//       const response = NextResponse.redirect(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE);
//       response.cookies.delete("access_token");
//       return response;
//     }
//   }

//   return NextResponse.next();
}
export const config: MiddlewareConfig = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
