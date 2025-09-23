import { addAchievement, addAchievements, deleteAchievement, deleteMultipleAchievements, getAchievements, updateAchievement } from "../../services/apiAchievements";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Achievement } from "../../interfaces/Achievement";
import { AchievementContext } from "./AchievementContext";
import { filterAchievements } from "../../utils/filterAchievements";
import toast from "react-hot-toast";
import { useAuthenticationContext } from "../authentication/AuthenicationContext";
import { useState } from "react";

export const AchievementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("date");
  const [sortByDirection, setSortDirection] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { user } = useAuthenticationContext();

  const { data: achievements = [], error, isLoading, refetch } = useQuery({
    queryKey: ["achievements"],
    queryFn: () => getAchievements(),
  });
  
  const sortByWithDirection = `${sortBy}-${sortByDirection ? "desc" : "asc"}`.toLowerCase();
  const filteredAchievements = filterAchievements(achievements, sortByWithDirection,  searchQuery, startDate, endDate);

  const { mutateAsync: addNewAchievement } = useMutation({
    mutationFn: async (achievement: Achievement) => {
      achievement = { ...achievement, owner_id: user?.id };
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
      await addAchievements(achievements, user?.id);
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
    const testAchievement = achievements.find((achievement: Achievement) => achievement.id === achievementId);
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