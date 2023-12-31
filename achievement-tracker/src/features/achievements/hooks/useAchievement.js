import { getAchievement } from "../../../services/apiAchievements";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const useAchievement = () => {
  const {achievementID} = useParams();
  const {isLoading, data: achievement, error} = useQuery({queryKey: ["achievement", achievementID], queryFn: () => getAchievement(achievementID)});
  return { isLoading, error, achievement };
}
