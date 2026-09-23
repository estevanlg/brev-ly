import { useQuery } from "@tanstack/react-query";
import { getLinks } from "../services/links";

export function useLinks() {
  return useQuery({
    queryKey: ["links"],
    queryFn: getLinks,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}
