import { pgTable, serial, text, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";

export const plans = pgTable('plans', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  goal: text('goal').notNull(),
  resources: text('resources').notNull(),
  constraints: text('constraints').notNull(),
  generatedPlan: text('generated_plan').notNull(),
  tasks: jsonb('tasks').$type<Array<{ id: string; title: string; status: string; priority: string }>>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

