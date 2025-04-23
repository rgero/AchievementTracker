import { addAchievement, addAchievements, deleteAchievement, deleteMultipleAchievements, getAchievements, updateAchievement } from "../services/apiAchievements";
import { createContext, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Achievement } from "../interfaces/Achievement";
import { filterAchievements } from "../utils/filterAchievements";
import toast from "react-hot-toast";
import { useAuth } from "./AuthenticationContext";

interface AchievementContextType {
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

const AchievementContext = createContext<AchievementContextType>({
  achievements: [],
  addMultipleAchievements: async () => {},
  addNewAchievement: async () => {},
  clearSelectedAchievement: () => {},
  deleteAchievementById: async () => {},
  deleteMultipleAchievementsById: async () => {},
  endDate: null,
  error: null,
  flipSortDirection: () => {},
  isLoading: false,
  processSelectionChange: () => {},
  searchQuery: "",
  selectedAchievement: null,
  setEndDate: () => {},
  setSearchQuery: () => {},
  setSortBy: () => {},
  setStartDate: () => {},
  sortBy: "",
  sortByDirection: false,
  startDate: null,
  updateExistingAchievement: async () => {},
});

export const AchievementProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("date");
  const [sortByDirection, setSortDirection] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { user } = useAuth();

  const { data: achievements = [], error, isLoading, refetch } = useQuery({
    queryKey: ["achievements"],
    queryFn: () => getAchievements(),
  });
  
  const sortByWithDirection = `${sortBy}-${sortByDirection ? "desc" : "asc"}`.toLowerCase();
  const filteredAchievements = filterAchievements(achievements, sortByWithDirection,  searchQuery, startDate, endDate);

  const { mutateAsync: addNewAchievement } = useMutation({
    mutationFn: async (achievement: Achievement) => {
      achievement = { ...achievement, owner_id: user.id };
      if (!achievement.id) delete achievement.id;
      await addAchievement(achievement);
    },
    onSuccess: () => {
      toast.success("Achievement added successfully!");
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
      toast.success("Achievements added successfully!");
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      refetch();
    },
  });

  const { mutateAsync: updateExistingAchievement } = useMutation({
    mutationFn: async (updatedData: Partial<Achievement>) => {
      await updateAchievement(updatedData.id, updatedData);
    },
    onSuccess: () => {
      toast.success("Achievement updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      setSelectedAchievement(null);
      refetch();
    },
  });

  const { mutateAsync: deleteAchievementById } = useMutation({
    mutationFn: async (achievementId: number) => {
      await deleteAchievement(achievementId);
    },
    onSuccess: () => {
      toast.success("Achievement deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      refetch();
    },
  });

  const { mutateAsync: deleteMultipleAchievementsById } = useMutation({
    mutationFn: async (achievementIds: Set<number>) => {
      await deleteMultipleAchievements(achievementIds);
    },
    onSuccess: () => {
      toast.success("Achievements deleted successfully!");
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

  const flipSortDirection = () => {
    setSortDirection((prev) => !prev);
  };

  return (
    <AchievementContext.Provider
      value={{
        achievements: filteredAchievements,
        addMultipleAchievements,
        addNewAchievement,
        clearSelectedAchievement,
        deleteAchievementById,
        deleteMultipleAchievementsById,
        endDate,
        error,
        flipSortDirection,
        isLoading,
        processSelectionChange,
        searchQuery,
        selectedAchievement,
        setEndDate,
        setSearchQuery,
        setSortBy,
        setStartDate,
        sortBy,
        sortByDirection,
        startDate,
        updateExistingAchievement,
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
