import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return NextResponse.json({ token: data.session?.access_token, user: data.user }, { status: 200 });
}
