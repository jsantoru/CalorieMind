import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { Card, CardContent } from '@/components/ui/card';

export function DailySummary() {
  const { todaysEntries, dailyCalorieGoal } = useSelector((state: RootState) => state.food);
  
  const totalCalories = todaysEntries.reduce((sum, entry) => sum + entry.calories, 0);
  const totalProtein = todaysEntries.reduce((sum, entry) => sum + entry.protein, 0);
  const totalCarbs = todaysEntries.reduce((sum, entry) => sum + entry.carbs, 0);
  const totalFat = todaysEntries.reduce((sum, entry) => sum + entry.fat, 0);
  const totalAlcohol = todaysEntries.reduce((sum, entry) => sum + entry.alcohol, 0);
  
  // Calculate percentages based on total calories consumed
  const totalMacroCalories = (totalProtein * 4) + (totalCarbs * 4) + (totalFat * 9) + (totalAlcohol * 7);
  const proteinPercent = totalMacroCalories > 0 ? Math.round((totalProtein * 4 / totalMacroCalories) * 100) : 0;
  const carbsPercent = totalMacroCalories > 0 ? Math.round((totalCarbs * 4 / totalMacroCalories) * 100) : 0;
  const fatPercent = totalMacroCalories > 0 ? Math.round((totalFat * 9 / totalMacroCalories) * 100) : 0;
  const alcoholPercent = totalMacroCalories > 0 ? Math.round((totalAlcohol * 7 / totalMacroCalories) * 100) : 0;
  
  const progress = Math.min((totalCalories / dailyCalorieGoal) * 100, 100);
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <Card className="bg-white m-4 rounded-lg shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Today's Summary</h2>
          <span className="text-sm text-gray-600">{currentDate}</span>
        </div>
        
        {/* Calorie Progress Circle */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle 
                cx="60" 
                cy="60" 
                r="54" 
                stroke="#EEEEEE" 
                strokeWidth="8" 
                fill="none"
              />
              <circle 
                cx="60" 
                cy="60" 
                r="54" 
                stroke="hsl(122, 50%, 56%)" 
                strokeWidth="8" 
                fill="none" 
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-medium text-gray-900">
                {totalCalories.toLocaleString()}
              </span>
              <span className="text-xs text-gray-600">
                of {dailyCalorieGoal.toLocaleString()} cal
              </span>
            </div>
          </div>
        </div>

        {/* Macronutrient Breakdown */}
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-1"></div>
            <span className="text-xs text-gray-600">Protein</span>
            <p className="text-sm font-medium">{proteinPercent}%</p>
          </div>
          <div>
            <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-1"></div>
            <span className="text-xs text-gray-600">Carbs</span>
            <p className="text-sm font-medium">{carbsPercent}%</p>
          </div>
          <div>
            <div className="w-8 h-8 bg-yellow-500 rounded-full mx-auto mb-1"></div>
            <span className="text-xs text-gray-600">Fat</span>
            <p className="text-sm font-medium">{fatPercent}%</p>
          </div>
          <div>
            <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-1"></div>
            <span className="text-xs text-gray-600">Alcohol</span>
            <p className="text-sm font-medium">{alcoholPercent}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
