import { type User, type InsertUser, type FoodEntry, type InsertFoodEntry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createFoodEntry(foodEntry: InsertFoodEntry & { userId: string }): Promise<FoodEntry>;
  getFoodEntriesForUser(userId: string): Promise<FoodEntry[]>;
  getFoodEntriesForUserByDate(userId: string, date: string): Promise<FoodEntry[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private foodEntries: Map<string, FoodEntry>;

  constructor() {
    this.users = new Map();
    this.foodEntries = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createFoodEntry(foodEntryData: InsertFoodEntry & { userId: string }): Promise<FoodEntry> {
    const id = randomUUID();
    const foodEntry: FoodEntry = {
      ...foodEntryData,
      id,
      createdAt: new Date(),
    };
    this.foodEntries.set(id, foodEntry);
    return foodEntry;
  }

  async getFoodEntriesForUser(userId: string): Promise<FoodEntry[]> {
    return Array.from(this.foodEntries.values())
      .filter((entry) => entry.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getFoodEntriesForUserByDate(userId: string, date: string): Promise<FoodEntry[]> {
    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    const endOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() + 1);

    return Array.from(this.foodEntries.values())
      .filter((entry) => 
        entry.userId === userId &&
        entry.createdAt >= startOfDay &&
        entry.createdAt < endOfDay
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export const storage = new MemStorage();
