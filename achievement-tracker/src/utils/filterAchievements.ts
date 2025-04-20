import { Achievement } from "../interfaces/Achievement";

export const filterAchievements = (achievements: Achievement[], searchQuery: string, startDate: Date | null, endDate: Date | null) => {
  return achievements.filter((achievement) => {
    const matchesSearch =
      achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const achievementDate = new Date(achievement.date);
    const matchesStartDate = !startDate || achievementDate >= startDate;
    const matchesEndDate = !endDate || achievementDate <= endDate;

    return matchesSearch && matchesStartDate && matchesEndDate;
  });
};
