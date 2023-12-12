import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ["/login", "/register"]

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (token && publicRoutes.includes(request.nextUrl.pathname)) {
    const home_url = request.nextUrl.clone();
    home_url.pathname = '/'
    NextResponse.rewrite(home_url)
    return NextResponse.redirect(home_url)
  }

  if (!token && request.nextUrl.pathname !== '/login') {
    const login_url = request.nextUrl.clone();
    login_url.pathname = '/login'
    NextResponse.rewrite(login_url)
    return NextResponse.redirect(login_url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", '/login', "/my-donations"]
}