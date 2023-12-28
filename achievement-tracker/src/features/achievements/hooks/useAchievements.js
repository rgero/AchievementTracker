import { getAchievements } from "../../../services/apiAchievements";
import { useQuery } from "@tanstack/react-query";

export const useAchievements = () => {
  const {isLoading, data: {data: achievements} = {}, error} = useQuery({queryKey: ["achievements"], queryFn: getAchievements});
  return { isLoading, error, achievements };
}
