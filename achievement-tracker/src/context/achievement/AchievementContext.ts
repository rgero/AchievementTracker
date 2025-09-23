import { createContext, useContext } from "react";

import { Achievement } from "../../interfaces/Achievement";

export interface AchievementContextType {
  achievements: Achievement[];
  addMultipleAchievements: (achievements: Achievement[]) => Promise<void>;
  addNewAchievement: (achievement: Achievement) => Promise<void>;
  clearSelectedAchievement: () => void;
  deleteAchievementById: (achievementId: number) => Promise<void>;
  deleteMultipleAchievementsById: (achievements: Set<number>) => Promise<void>;
  endDate: Date | null;
  error: Error | null;
  flipSortDirection: () => void;
  isLoading: boolean;
  processSelectionChange: (achievementId: number) => void;
  searchQuery: string;
  selectedAchievement: Achievement | null;
  setEndDate: (date: Date | null) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: string) => void;
  setStartDate: (date: Date | null) => void;
  sortBy: string;
  sortByDirection: boolean;
  startDate: Date | null;
  updateExistingAchievement: (updatedData: Partial<Achievement>) => Promise<void>;
}

export const AchievementContext = createContext<AchievementContextType | null>(null);

export const useAchievementsContext = () => {
  const context = useContext(AchievementContext);
  if (!context) throw new Error("useAchievements must be used within an AchievementProvider");
  return context;
};
