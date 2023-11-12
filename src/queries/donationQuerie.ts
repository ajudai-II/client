import { useQuery, useInfiniteQuery } from "react-query";
import { api } from "@/services/api";

export const useGetDonationsByDonator = (_id: string, nextPage: number) => {
  return useInfiniteQuery(["donations", _id], async () => {
    const { data } = await api.get(`/user-donations/${_id}?page=${nextPage}`);
    return data;
  }, {

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : null;
    }, staleTime: 1000 * 60 * 10
  });
}
