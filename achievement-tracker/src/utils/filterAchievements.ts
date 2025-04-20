import { Achievement } from "../interfaces/Achievement";

export const filterAchievements = (achievements: Achievement[], sortBy: string, searchQuery: string, startDate: Date | null, endDate: Date | null) => {
  const filtered = achievements.filter((achievement) => {
    const matchesSearch =
      achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const achievementDate = new Date(achievement.date);
    const matchesStartDate = !startDate || achievementDate >= startDate;
    const matchesEndDate = !endDate || achievementDate <= endDate;

    return matchesSearch && matchesStartDate && matchesEndDate;
  });

  // Sorting logic
  const [field, direction] = sortBy.split("-");
  const sorted = [...filtered].sort((a, b) => {
    let aValue = a[field as keyof Achievement];
    let bValue = b[field as keyof Achievement];

    if (field === "date") {
      aValue = new Date(aValue as string);
      bValue = new Date(bValue as string);
    }

    if (aValue! < bValue!) return direction === "asc" ? -1 : 1;
    if (aValue! > bValue!) return direction === "asc" ? 1 : -1;
    return 0;
  });

  return sorted;
};
