import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

export interface NutritionAnalysis {
  name: string;
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  alcohol: number; // grams
  proteinPercent: number;
  carbsPercent: number;
  fatPercent: number;
  alcoholPercent: number;
}

export async function analyzeFoodWithAI(description: string): Promise<NutritionAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a nutrition expert. Analyze the food description and provide detailed nutritional information. 
          Calculate the macronutrient percentages based on total calories (protein: 4 cal/g, carbs: 4 cal/g, fat: 9 cal/g, alcohol: 7 cal/g).
          Respond with JSON in this exact format: {
            "name": "string (concise food name)",
            "calories": number,
            "protein": number (grams),
            "carbs": number (grams), 
            "fat": number (grams),
            "alcohol": number (grams, 0 if no alcohol),
            "proteinPercent": number (percentage of total calories from protein),
            "carbsPercent": number (percentage of total calories from carbs),
            "fatPercent": number (percentage of total calories from fat),
            "alcoholPercent": number (percentage of total calories from alcohol)
          }`
        },
        {
          role: "user",
          content: `Analyze this food: ${description}`
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    // Validate the response structure
    if (!result.name || typeof result.calories !== 'number') {
      throw new Error("Invalid nutrition analysis response");
    }

    // Ensure percentages add up to approximately 100%
    const totalPercent = result.proteinPercent + result.carbsPercent + result.fatPercent + result.alcoholPercent;
    if (Math.abs(totalPercent - 100) > 5) {
      // Recalculate percentages if they're off
      const totalCalories = result.calories;
      result.proteinPercent = Math.round((result.protein * 4 / totalCalories) * 100);
      result.carbsPercent = Math.round((result.carbs * 4 / totalCalories) * 100);
      result.fatPercent = Math.round((result.fat * 9 / totalCalories) * 100);
      result.alcoholPercent = Math.round((result.alcohol * 7 / totalCalories) * 100);
    }

    return result as NutritionAnalysis;
  } catch (error) {
    console.error("Error analyzing food with OpenAI:", error);
    throw new Error("Failed to analyze food with AI: " + (error as Error).message);
  }
}
