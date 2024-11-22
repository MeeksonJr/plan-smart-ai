import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { plans } from '@/lib/schema'; // Remove tasks import
import { desc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    const fetchedPlans = await db.select().from(plans).orderBy(desc(plans.createdAt));
    
    return NextResponse.json({ plans: fetchedPlans });
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
  }
}
