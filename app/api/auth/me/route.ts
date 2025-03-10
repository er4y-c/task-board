import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return NextResponse.json({ error: error?.message || 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ user: data.user }, { status: 200 });
}
