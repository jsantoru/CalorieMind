import { Home, History, TrendingUp, User } from 'lucide-react';

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-md mx-auto grid grid-cols-4">
        <button className="flex flex-col items-center py-3 px-4 text-green-600">
          <Home className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">Home</span>
        </button>
        
        <button className="flex flex-col items-center py-3 px-4 text-gray-600 hover:text-green-600 transition-colors">
          <History className="h-6 w-6 mb-1" />
          <span className="text-xs">History</span>
        </button>
        
        <button className="flex flex-col items-center py-3 px-4 text-gray-600 hover:text-green-600 transition-colors">
          <TrendingUp className="h-6 w-6 mb-1" />
          <span className="text-xs">Insights</span>
        </button>
        
        <button className="flex flex-col items-center py-3 px-4 text-gray-600 hover:text-green-600 transition-colors">
          <User className="h-6 w-6 mb-1" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </nav>
  );
}
