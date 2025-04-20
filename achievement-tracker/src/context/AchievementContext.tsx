import { addAchievement, addAchievements, deleteAchievement, deleteMultipleAchievements, getAchievements, updateAchievement } from "../services/apiAchievements";
import { createContext, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Achievement } from "../interfaces/Achievement";
import { filterAchievements } from "../utils/filterAchievements";
import { useAuth } from "./AuthenticationContext";

interface AchievementContextType {
  achievements: Achievement[];
  selectedAchievements: Set<number>;
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  addNewAchievement: (achievement: Achievement) => Promise<void>;
  addMultipleAchievements: (achievements: Achievement[]) => Promise<void>;
  deleteAchievementById: (achievementId: string) => Promise<void>;
  deleteMultipleAchievementsById: (achievements: Set<number>) => Promise<void>;
  setSelectedAchievements: (selectedAchievements: Set<number>) => void;
  updateExistingAchievement: (updatedData: Partial<Achievement>) => Promise<void>;
  error: Error | null;
}

const AchievementContext = createContext<AchievementContextType>({
  achievements: [],
  selectedAchievements: new Set(),
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
  updateExistingAchievement: async () => {},
  setSelectedAchievements: () => {},
  error: null,
});

export const AchievementProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [selectedAchievements, setSelectedAchievements] = useState<Set<number>>(new Set());
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
      selectedAchievements.clear();
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
      selectedAchievements.clear();
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

  return (
    <AchievementContext.Provider
      value={{
        achievements: filteredAchievements,
        selectedAchievements,
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
        setSelectedAchievements,
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
