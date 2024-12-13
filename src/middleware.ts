import { NextResponse, NextRequest } from "next/server";

const protectedRoutes = ["/admin", "/ads"]

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const isProtectedRoute = protectedRoutes.includes(path);

  const userCookie = req.cookies.get('session');
  console.log(userCookie)

  if (isProtectedRoute && !userCookie) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
