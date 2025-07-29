import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { clearAnalysisResult, addFoodEntry } from '@/store/foodSlice';
import type { RootState } from '@/store';
import type { FoodEntry } from '@shared/schema';

export function AnalysisModal() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { analysisResult, showAnalysisModal } = useSelector((state: RootState) => state.food);

  const addFoodMutation = useMutation({
    mutationFn: async () => {
      if (!analysisResult) throw new Error('No analysis result');
      
      const response = await apiRequest('POST', '/api/foods', {
        name: analysisResult.name,
        description: analysisResult.name, // Using name as description for now
        calories: analysisResult.calories,
        protein: analysisResult.protein,
        carbs: analysisResult.carbs,
        fat: analysisResult.fat,
        alcohol: analysisResult.alcohol,
        proteinPercent: analysisResult.proteinPercent,
        carbsPercent: analysisResult.carbsPercent,
        fatPercent: analysisResult.fatPercent,
        alcoholPercent: analysisResult.alcoholPercent,
      });
      return response.json();
    },
    onSuccess: (newEntry: FoodEntry) => {
      dispatch(addFoodEntry(newEntry));
      dispatch(clearAnalysisResult());
      // Invalidate and refetch today's foods
      queryClient.invalidateQueries({ queryKey: ['/api/foods/today'] });
      queryClient.invalidateQueries({ queryKey: ['/api/foods'] });
    },
  });

  const handleClose = () => {
    dispatch(clearAnalysisResult());
  };

  const handleAddFood = () => {
    addFoodMutation.mutate();
  };

  if (!analysisResult) return null;

  return (
    <Dialog open={showAnalysisModal} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-t-xl shadow-lg">
        <div className="p-6">
          {/* Handle bar */}
          <div className="flex justify-center pb-4">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>
          
          <h3 className="text-xl font-medium text-gray-900 mb-4">
            {analysisResult.name}
          </h3>
          
          {/* Nutritional Information */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-center mb-4">
              <span className="text-3xl font-medium text-green-600">
                {analysisResult.calories}
              </span>
              <span className="text-lg text-gray-600 ml-1">calories</span>
            </div>
            
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg font-medium text-gray-900">
                  {Math.round(analysisResult.protein)}g
                </div>
                <div className="text-xs text-gray-600">Protein</div>
                <div className="text-sm font-medium text-blue-600">
                  {analysisResult.proteinPercent}%
                </div>
              </div>
              <div>
                <div className="text-lg font-medium text-gray-900">
                  {Math.round(analysisResult.carbs)}g
                </div>
                <div className="text-xs text-gray-600">Carbs</div>
                <div className="text-sm font-medium text-green-600">
                  {analysisResult.carbsPercent}%
                </div>
              </div>
              <div>
                <div className="text-lg font-medium text-gray-900">
                  {Math.round(analysisResult.fat)}g
                </div>
                <div className="text-xs text-gray-600">Fat</div>
                <div className="text-sm font-medium text-yellow-600">
                  {analysisResult.fatPercent}%
                </div>
              </div>
              <div>
                <div className="text-lg font-medium text-gray-900">
                  {Math.round(analysisResult.alcohol)}g
                </div>
                <div className="text-xs text-gray-600">Alcohol</div>
                <div className="text-sm font-medium text-purple-600">
                  {analysisResult.alcoholPercent}%
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              variant="outline"
              onClick={handleClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 px-6 rounded-lg font-medium transition-colors"
              disabled={addFoodMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddFood}
              disabled={addFoodMutation.isPending}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              {addFoodMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add to Log'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
