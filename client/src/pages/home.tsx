import { DailySummary } from '@/components/daily-summary';
import { FoodInput } from '@/components/food-input';
import { FoodHistory } from '@/components/food-history';
import { WeeklyProgress } from '@/components/weekly-progress';
import { BottomNavigation } from '@/components/bottom-navigation';
import { AnalysisModal } from '@/components/analysis-modal';
import { HandPlatter, Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top App Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <HandPlatter className="text-green-600 mr-3 h-6 w-6" />
            <h1 className="text-xl font-medium text-gray-900">CalorieTracker</h1>
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto pb-20">
        <DailySummary />
        <FoodInput />
        <FoodHistory />
        <WeeklyProgress />
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Floating Action Button */}
      <Button 
        size="lg"
        className="fixed bottom-20 right-4 w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Analysis Modal */}
      <AnalysisModal />
    </div>
  );
}
