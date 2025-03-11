import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const publicPaths = ['/api/auth/login', '/api/auth/register'];
  const token = request.cookies.get('token')?.value;

  if (
    request.nextUrl.pathname.startsWith('/api/') &&
    !publicPaths.includes(request.nextUrl.pathname)
  ) {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
