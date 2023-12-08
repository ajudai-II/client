import { useQuery, useInfiniteQuery } from "react-query";
import { api } from "@/services/api";

export const useGetDonationsByDonator = (_id: string, page?: number) => {
  return useQuery(["donations", _id], async () => {
    const { data } = await api.get(`/user-donations/${_id}?page=${page ? page : 1}`);
    return data;
  }, {
    staleTime: 1000 * 60 * 10
  });
}

export const useGetDonationsByCategory = (category: string) => {
  return useQuery(['donationsByCategory', category], async () => {
    const { data } = await api.get(`/donations-by-category/${category}`);
    return data;
  }, {
    staleTime: 1000 * 60 * 10,
  });
};