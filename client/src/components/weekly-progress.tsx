import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { FoodEntry } from '@shared/schema';

export function WeeklyProgress() {
  const { data: allEntries = [], isLoading } = useQuery<FoodEntry[]>({
    queryKey: ['/api/foods'],
  });

  // Get the last 7 days
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  };

  const getDayCalories = (date: Date) => {
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    
    return allEntries
      .filter(entry => {
        const entryDate = new Date(entry.createdAt);
        return entryDate >= startOfDay && entryDate < endOfDay;
      })
      .reduce((sum, entry) => sum + entry.calories, 0);
  };

  const days = getLast7Days();
  const dailyGoal = 2000;

  if (isLoading) {
    return (
      <Card className="bg-white m-4 rounded-lg shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Progress</h3>
          <div className="grid grid-cols-7 gap-2 text-center">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-xs text-gray-600 mb-2">
                  <Skeleton className="h-3 w-6" />
                </div>
                <div className="w-8 h-20 bg-gray-200 rounded-full mb-2">
                  <Skeleton className="w-full h-full rounded-full" />
                </div>
                <Skeleton className="h-3 w-8" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white m-4 rounded-lg shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Progress</h3>
        
        <div className="grid grid-cols-7 gap-2 text-center">
          {days.map((day, index) => {
            const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
            const calories = getDayCalories(day);
            const percentage = Math.min((calories / dailyGoal) * 100, 100);
            const isToday = day.toDateString() === new Date().toDateString();
            const isFuture = day > new Date();
            
            return (
              <div key={index} className="text-xs text-gray-600 mb-2">
                <div className="mb-2">{dayName}</div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-20 bg-gray-200 rounded-full mb-2 overflow-hidden">
                    {!isFuture && (
                      <div 
                        className={`w-full rounded-full transition-all duration-300 ${
                          percentage >= 100 ? 'bg-green-500' : 'bg-green-600'
                        }`}
                        style={{ height: `${percentage}%`, marginTop: `${100 - percentage}%` }}
                      />
                    )}
                  </div>
                  <span className={`text-xs ${isToday ? 'font-medium text-green-600' : 'text-gray-600'}`}>
                    {isFuture ? '0' : calories.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
