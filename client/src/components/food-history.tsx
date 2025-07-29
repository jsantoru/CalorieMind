import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { setTodaysEntries } from '@/store/foodSlice';
import type { FoodEntry } from '@shared/schema';

export function FoodHistory() {
  const dispatch = useDispatch();
  
  const { data: entries = [], isLoading } = useQuery<FoodEntry[]>({
    queryKey: ['/api/foods/today'],
  });

  useEffect(() => {
    if (entries) {
      dispatch(setTodaysEntries(entries));
    }
  }, [entries, dispatch]);

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (isLoading) {
    return (
      <Card className="bg-white m-4 rounded-lg shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Foods</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border border-gray-100 rounded-lg">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-full mb-2" />
                <div className="flex space-x-4">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white m-4 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-medium text-gray-900">Today's Foods</h3>
      </div>
      
      {entries.length === 0 ? (
        <CardContent className="p-6 text-center text-gray-500">
          No food entries yet today. Add your first meal above!
        </CardContent>
      ) : (
        <div className="divide-y divide-gray-100">
          {entries.map((food) => (
            <div key={food.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{food.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{food.description}</p>
                  <div className="flex space-x-4 text-xs text-gray-600">
                    <span>P: <span className="font-medium">{Math.round(food.protein)}g</span></span>
                    <span>C: <span className="font-medium">{Math.round(food.carbs)}g</span></span>
                    <span>F: <span className="font-medium">{Math.round(food.fat)}g</span></span>
                    {food.alcohol > 0 && (
                      <span>A: <span className="font-medium">{Math.round(food.alcohol)}g</span></span>
                    )}
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-medium text-gray-900">{food.calories} cal</p>
                  <p className="text-xs text-gray-600">{formatTime(food.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
