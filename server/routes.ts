import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeFoodSchema, insertFoodEntrySchema } from "@shared/schema";
import { analyzeFoodWithAI } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Analyze food with AI
  app.post("/api/foods/analyze", async (req, res) => {
    try {
      const { description } = analyzeFoodSchema.parse(req.body);
      const analysis = await analyzeFoodWithAI(description);
      res.json(analysis);
    } catch (error: any) {
      console.error("Error analyzing food:", error);
      res.status(400).json({ 
        message: error.message || "Failed to analyze food" 
      });
    }
  });

  // Add food entry
  app.post("/api/foods", async (req, res) => {
    try {
      const foodData = insertFoodEntrySchema.parse(req.body);
      // For demo purposes, using a default user ID
      const userId = "demo-user";
      
      const foodEntry = await storage.createFoodEntry({
        ...foodData,
        userId
      });
      
      res.json(foodEntry);
    } catch (error: any) {
      console.error("Error creating food entry:", error);
      res.status(400).json({ 
        message: error.message || "Failed to create food entry" 
      });
    }
  });

  // Get today's food entries
  app.get("/api/foods/today", async (req, res) => {
    try {
      // For demo purposes, using a default user ID
      const userId = "demo-user";
      const today = new Date().toISOString().split('T')[0];
      
      const entries = await storage.getFoodEntriesForUserByDate(userId, today);
      res.json(entries);
    } catch (error: any) {
      console.error("Error fetching today's foods:", error);
      res.status(500).json({ 
        message: "Failed to fetch food entries" 
      });
    }
  });

  // Get all food entries for user
  app.get("/api/foods", async (req, res) => {
    try {
      // For demo purposes, using a default user ID
      const userId = "demo-user";
      
      const entries = await storage.getFoodEntriesForUser(userId);
      res.json(entries);
    } catch (error: any) {
      console.error("Error fetching foods:", error);
      res.status(500).json({ 
        message: "Failed to fetch food entries" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
