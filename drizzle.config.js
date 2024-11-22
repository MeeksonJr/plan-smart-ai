import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url:'postgresql://test-runs_owner:mYG2LXPUs7Cv@ep-damp-breeze-a54ttdon.us-east-2.aws.neon.tech/Brandboost-ai?sslmode=require'
  }
});
