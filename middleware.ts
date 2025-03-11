import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabase } from './utils/supabase';

export async function middleware(request: NextRequest) {
  const publicPaths = ['/api/auth/login', '/api/auth/register'];
  const token = request.cookies.get('token')?.value;

  if (
    request.nextUrl.pathname.startsWith('/api/') &&
    !publicPaths.includes(request.nextUrl.pathname)
  ) {
    const { error } = await supabase.auth.getUser(token);
    if (!token || error) {
      return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
