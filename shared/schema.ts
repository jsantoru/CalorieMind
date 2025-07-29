import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  dailyCalorieGoal: integer("daily_calorie_goal").notNull().default(2000),
});

export const foodEntries = pgTable("food_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  calories: integer("calories").notNull(),
  protein: real("protein").notNull(), // grams
  carbs: real("carbs").notNull(), // grams
  fat: real("fat").notNull(), // grams
  alcohol: real("alcohol").notNull().default(0), // grams
  proteinPercent: real("protein_percent").notNull(),
  carbsPercent: real("carbs_percent").notNull(),
  fatPercent: real("fat_percent").notNull(),
  alcoholPercent: real("alcohol_percent").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  dailyCalorieGoal: true,
});

export const insertFoodEntrySchema = createInsertSchema(foodEntries).pick({
  name: true,
  description: true,
  calories: true,
  protein: true,
  carbs: true,
  fat: true,
  alcohol: true,
  proteinPercent: true,
  carbsPercent: true,
  fatPercent: true,
  alcoholPercent: true,
});

export const analyzeFoodSchema = z.object({
  description: z.string().min(1, "Food description is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertFoodEntry = z.infer<typeof insertFoodEntrySchema>;
export type FoodEntry = typeof foodEntries.$inferSelect;
export type AnalyzeFoodRequest = z.infer<typeof analyzeFoodSchema>;
