/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function PUT(req: NextRequest, context: any) {
  try {
    const { updateData } = await req.json();
    const { params } = context;

    if (!params.id) return NextResponse.json({ error: 'Task id is required' }, { status: 400 });

    const { error, data } = await supabase.from('tasks').update(updateData).eq('id', params.id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  try {
    const { params } = context;
    if (!params.id) return NextResponse.json({ error: 'Task id is required' }, { status: 400 });

    const { error } = await supabase.from('tasks').delete().eq('id', params.id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
