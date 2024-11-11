import { NextResponse, NextRequest } from "next/server";

const protectedRoutes = ["/admin", "/ads"];
//const publicRoutes = ["/", "/home"];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Validar se é uma rota protegida ou pública
  const isProtectedRoute = protectedRoutes.includes(path);
  //const isPublicRoute = publicRoutes.includes(path);

  // Verificar se há o cookie "session" 
  const userCookie = req.cookies.get('session')?.value;

  // Se o cookie não existir, redirecionar para a página /
  if (isProtectedRoute && !userCookie) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Caso contrário, permitir o acesso à rota
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
