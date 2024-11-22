import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { plans } from '@/lib/schema';

export async function POST(req: Request) {
  try {
    const { goal, resources, constraints, plan } = await req.json();

    const [savedPlan] = await db.insert(plans).values({
      goal,
      resources,
      constraints,
      plan
    }).returning();

    return NextResponse.json({ success: true, planId: savedPlan.id });
  } catch (error) {
    console.error('Error saving plan:', error);
    return NextResponse.json({ error: 'Failed to save plan' }, { status: 500 });
  }
}
