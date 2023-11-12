import { useQuery } from "react-query";
import { api } from "@/services/api";

export const useGetDonationsByDonator = (_id: string) => {
  return useQuery("donations", async () => {
    const { data } = await api.get(`/user-donations/${_id}`);
    return data;
  }, { staleTime: 1000 * 60 * 10 });
}