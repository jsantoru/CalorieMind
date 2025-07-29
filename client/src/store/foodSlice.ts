import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FoodEntry } from '@shared/schema';

interface FoodState {
  todaysEntries: FoodEntry[];
  dailyCalorieGoal: number;
  analysisResult: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    alcohol: number;
    proteinPercent: number;
    carbsPercent: number;
    fatPercent: number;
    alcoholPercent: number;
  } | null;
  showAnalysisModal: boolean;
  isAnalyzing: boolean;
}

const initialState: FoodState = {
  todaysEntries: [],
  dailyCalorieGoal: 2000,
  analysisResult: null,
  showAnalysisModal: false,
  isAnalyzing: false,
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setTodaysEntries: (state, action: PayloadAction<FoodEntry[]>) => {
      state.todaysEntries = action.payload;
    },
    addFoodEntry: (state, action: PayloadAction<FoodEntry>) => {
      state.todaysEntries.unshift(action.payload);
    },
    setAnalysisResult: (state, action: PayloadAction<FoodState['analysisResult']>) => {
      state.analysisResult = action.payload;
    },
    setShowAnalysisModal: (state, action: PayloadAction<boolean>) => {
      state.showAnalysisModal = action.payload;
    },
    setIsAnalyzing: (state, action: PayloadAction<boolean>) => {
      state.isAnalyzing = action.payload;
    },
    clearAnalysisResult: (state) => {
      state.analysisResult = null;
      state.showAnalysisModal = false;
    },
  },
});

export const {
  setTodaysEntries,
  addFoodEntry,
  setAnalysisResult,
  setShowAnalysisModal,
  setIsAnalyzing,
  clearAnalysisResult,
} = foodSlice.actions;

export default foodSlice.reducer;
