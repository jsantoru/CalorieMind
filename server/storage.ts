import { users, foodEntries, type User, type InsertUser, type FoodEntry, type InsertFoodEntry } from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lt, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createFoodEntry(foodEntry: InsertFoodEntry & { userId: string }): Promise<FoodEntry>;
  getFoodEntriesForUser(userId: string): Promise<FoodEntry[]>;
  getFoodEntriesForUserByDate(userId: string, date: string): Promise<FoodEntry[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createFoodEntry(foodEntryData: InsertFoodEntry & { userId: string }): Promise<FoodEntry> {
    const [foodEntry] = await db
      .insert(foodEntries)
      .values(foodEntryData)
      .returning();
    return foodEntry;
  }

  async getFoodEntriesForUser(userId: string): Promise<FoodEntry[]> {
    return await db
      .select()
      .from(foodEntries)
      .where(eq(foodEntries.userId, userId))
      .orderBy(desc(foodEntries.createdAt));
  }

  async getFoodEntriesForUserByDate(userId: string, date: string): Promise<FoodEntry[]> {
    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    const endOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() + 1);

    return await db
      .select()
      .from(foodEntries)
      .where(
        and(
          eq(foodEntries.userId, userId),
          gte(foodEntries.createdAt, startOfDay),
          lt(foodEntries.createdAt, endOfDay)
        )
      )
      .orderBy(desc(foodEntries.createdAt));
  }
}

export const storage = new DatabaseStorage();
