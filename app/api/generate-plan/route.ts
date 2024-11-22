import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { db } from '@/lib/db';
import { plans } from '@/lib/schema';

// Initialize OpenAI with error handling
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generatePlanWithRetry(goal, resources, constraints, retries = 3) {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", 
        messages: [
          {
            role: "system",
            content: "You are an AI assistant that generates personalized, actionable plans based on goals, resources, and constraints."
          },
          {
            role: "user",
            content: `Generate a plan for the following:
            Goal: ${goal}
            Resources: ${resources}
            Constraints: ${constraints}
            
            Provide a structured plan with main steps and sub-tasks.`
          }
        ],
      });

      if (completion.choices[0]?.message?.content) {
        return completion.choices[0].message.content;
      } else {
        throw new Error('Failed to generate plan content');
      }
    } catch (error) {
      if (error.code === 'insufficient_quota') {
        console.error('Quota exceeded, retrying...', { attempt: attempt + 1 });
        if (attempt < retries - 1) {
          await delay(5000); // Wait for 5 seconds before retrying
        }
      } else {
        throw error;
      }
    }
  }
  throw new Error('API quota exceeded after multiple retries');
}

export async function POST(req: Request) {
  console.log('Starting plan generation process');
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key is missing');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  if (!process.env.DATABASE_URL) {
    console.error('Database URL is missing');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { goal, resources, constraints } = body;

    if (!goal || !resources || !constraints) {
      console.error('Missing required fields:', { goal, resources, constraints });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Generating plan with OpenAI');
    
    const generatedPlan = await generatePlanWithRetry(goal, resources, constraints);
    console.log('Plan generated successfully');

    // Save plan to database
    console.log('Saving plan to database');
    const [savedPlan] = await db.insert(plans).values({
      title: `Plan for: ${goal.substring(0, 50)}...`,
      goal,
      resources,
      constraints,
      generatedPlan,
      tasks: [],
    }).returning();

    console.log('Plan saved successfully:', savedPlan.id);
    
    return NextResponse.json({
      success: true,
      plan: generatedPlan,
      planId: savedPlan.id
    });

  } catch (error) {
    console.error('Error in generate-plan route:', error);
    
    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'API quota exceeded, please try again later' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate plan' },
      { status: 500 }
    );
  }
}
