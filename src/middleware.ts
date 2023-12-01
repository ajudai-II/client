import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ["/login", "/register"]

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (token) {
    return NextResponse.next();
  }

  const currentPath = request.nextUrl.pathname;

  if (!token && publicRoutes.includes(currentPath)) {
    const login_url = request.nextUrl.clone();
    login_url.pathname = '/login'
    NextResponse.rewrite(login_url)
    return NextResponse.redirect(login_url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", '/login', "/my-donations", "/create-donation"]
}
