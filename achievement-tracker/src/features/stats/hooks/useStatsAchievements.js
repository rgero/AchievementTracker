import { getStatsAchievements } from "../../../services/apiAchievements";
import { useQuery } from "@tanstack/react-query";

export const useStatsAchievements = () => {

  // This is cool, the filter input makes it a dependency like useEffect.
  const {isLoading, data: {data: achievements, count} = {}, error} = useQuery({queryKey: ["statsAchievements"], queryFn: () => getStatsAchievements()});
  return { isLoading, error, achievements, count };
}
