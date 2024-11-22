import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tasks } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const { planId, taskId, newStatus } = await req.json();

    const [updatedTask] = await db.update(tasks)
      .set({ status: newStatus })
      .where(eq(tasks.id, taskId))
      .returning();

    return NextResponse.json({ success: true, task: updatedTask });
  } catch (error) {
    console.error('Error updating task status:', error);
    return NextResponse.json({ error: 'Failed to update task status' }, { status: 500 });
  }
}

