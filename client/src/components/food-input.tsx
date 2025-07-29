import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Search } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { setAnalysisResult, setShowAnalysisModal, setIsAnalyzing } from '@/store/foodSlice';
import type { RootState } from '@/store';

export function FoodInput() {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const { isAnalyzing } = useSelector((state: RootState) => state.food);

  const analyzeFoodMutation = useMutation({
    mutationFn: async (foodDescription: string) => {
      const response = await apiRequest('POST', '/api/foods/analyze', { 
        description: foodDescription 
      });
      return response.json();
    },
    onMutate: () => {
      dispatch(setIsAnalyzing(true));
    },
    onSuccess: (data) => {
      dispatch(setAnalysisResult(data));
      dispatch(setShowAnalysisModal(true));
      dispatch(setIsAnalyzing(false));
      setDescription('');
    },
    onError: (error) => {
      console.error('Failed to analyze food:', error);
      dispatch(setIsAnalyzing(false));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && !isAnalyzing) {
      analyzeFoodMutation.mutate(description.trim());
    }
  };

  return (
    <Card className="bg-white m-4 rounded-lg shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add Food</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 outline-none transition-colors"
              rows={3}
              placeholder="Describe your food... e.g., 'grilled chicken breast with rice and broccoli' or 'medium banana'"
              disabled={isAnalyzing}
            />
          </div>
          
          <Button 
            type="submit"
            disabled={!description.trim() || isAnalyzing}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center shadow-sm"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing nutrition with AI...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Analyze Food
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
