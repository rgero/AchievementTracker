import { addAchievement, addAchievements, deleteAchievement, deleteMultipleAchievements, getAchievements, updateAchievement } from "../services/apiAchievements";
import { createContext, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Achievement } from "../interfaces/Achievement";
import { filterAchievements } from "../utils/filterAchievements";
import { useAuth } from "./AuthenticationContext";

interface AchievementContextType {
  achievements: Achievement[];
  selectedAchievement: Achievement | null;
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  addNewAchievement: (achievement: Achievement) => Promise<void>;
  addMultipleAchievements: (achievements: Achievement[]) => Promise<void>;
  deleteAchievementById: (achievementId: number) => Promise<void>;
  deleteMultipleAchievementsById: (achievements: Set<number>) => Promise<void>;
  processSelectionChange: (achievementId: number) => void;
  clearSelectedAchievement: () => void;
  updateExistingAchievement: (updatedData: Partial<Achievement>) => Promise<void>;
  error: Error | null;
}

const AchievementContext = createContext<AchievementContextType>({
  achievements: [],
  selectedAchievement: null,
  isLoading: false,
  searchQuery: "",
  setSearchQuery: () => {},
  startDate: null,
  endDate: null,
  setStartDate: () => {},
  setEndDate: () => {},
  addNewAchievement: async () => {},
  addMultipleAchievements: async () => {},
  deleteAchievementById: async () => {},
  deleteMultipleAchievementsById: async () => {},
  processSelectionChange: () => {},
  clearSelectedAchievement: () => {},
  updateExistingAchievement: async () => {},
  error: null,
});

export const AchievementProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { user } = useAuth();

  const { data: achievements = [], error, isLoading, refetch } = useQuery({
    queryKey: ["achievements"],
    queryFn: () => getAchievements(),
  });
  const filteredAchievements = filterAchievements(achievements, searchQuery, startDate, endDate);

  const { mutateAsync: addNewAchievement } = useMutation({
    mutationFn: async (achievement: Achievement) => {
      achievement = { ...achievement, owner_id: user.id };
      if (!achievement.id) delete achievement.id;
      await addAchievement(achievement);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      setSelectedAchievement(null);
      refetch();
    },
  });

  const { mutateAsync: addMultipleAchievements } = useMutation({
    mutationFn: async (achievements: Achievement[]) => {
      await addAchievements(achievements);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      refetch();
    },
  });

  const { mutateAsync: updateExistingAchievement } = useMutation({
    mutationFn: async (updatedData: Partial<Achievement>) => {
      await updateAchievement(updatedData.id, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      setSelectedAchievement(null);
      refetch();
    },
  });

  const { mutateAsync: deleteAchievementById } = useMutation({
    mutationFn: async (achievementId: string) => {
      await deleteAchievement(achievementId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      refetch();
    },
  });

  const { mutateAsync: deleteMultipleAchievementsById } = useMutation({
    mutationFn: async (achievementIds: Set<number>) => {
      await deleteMultipleAchievements(achievementIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      refetch();
    },
  });

  const processSelectionChange = (achievementId: number) => {
    const testAchievement = achievements.find((achievement) => achievement.id === achievementId);
    if (!testAchievement) return;
    setSelectedAchievement(testAchievement);
  }

  const clearSelectedAchievement = () => {
    setSelectedAchievement(null);
  }

  return (
    <AchievementContext.Provider
      value={{
        achievements: filteredAchievements,
        selectedAchievement,
        isLoading,
        searchQuery,
        setSearchQuery,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        addNewAchievement,
        addMultipleAchievements,
        deleteAchievementById,
        deleteMultipleAchievementsById,
        processSelectionChange,
        clearSelectedAchievement,
        updateExistingAchievement,
        error,
      }}
    >
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (!context) throw new Error("useAchievements must be used within an AchievementProvider");
  return context;
};
