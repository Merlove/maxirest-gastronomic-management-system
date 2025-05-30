import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth-token")
  const isAuthPage = request.nextUrl.pathname === "/"
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard")

  // If trying to access dashboard without auth, redirect to login
  if (isDashboardPage && !authToken) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If trying to access login page with auth, redirect to dashboard
  if (isAuthPage && authToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
