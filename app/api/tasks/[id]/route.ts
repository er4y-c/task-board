import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { updateData } = await req.json();
    const { id } = params;

    if (!id) return NextResponse.json({ error: 'Task id is required' }, { status: 400 });

    const { error, data } = await supabase.from('tasks').update(updateData).eq('id', id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: 'Task id is required' }, { status: 400 });

    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
