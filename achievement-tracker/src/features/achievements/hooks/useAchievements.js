import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ENTRIES_PER_PAGE } from "../../../utils/constants";
import { getAchievements } from "../../../services/apiAchievements";
import { useSearchParams } from "react-router-dom";

export const useAchievements = () => {

  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // SORT
  const sortByRaw = searchParams.get('sortBy') || 'date-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = {field, direction}

  // PAGES
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // This is cool, the filter input makes it a dependency like useEffect.
  const {isLoading, data: {data: achievements, count} = {}, error} = useQuery({queryKey: ["achievements", sortBy, page], queryFn: () => getAchievements({sortBy, page})});

  // Pre-fetch some data
  const pageCount = Math.ceil(count / ENTRIES_PER_PAGE);
  if (page < pageCount) {
    queryClient.prefetchQuery({queryKey: ["achievements", sortBy, page+1], queryFn: () => getAchievements({sortBy, page: page+1})})
  }
  if (page > 1)
  {
    queryClient.prefetchQuery({queryKey: ["achievements", sortBy, page-1], queryFn: () => getAchievements({sortBy, page: page-1})})
  }

  return { isLoading, error, achievements, count };
}
