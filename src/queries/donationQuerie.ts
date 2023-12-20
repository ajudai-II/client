import { useQuery } from "react-query";
import { api } from "@/services/api";

export const useGetDonationsByDonator = (_id: string, page?: number) => {
  return useQuery(
    ["donations", _id],
    async () => {
      const { data } = await api.get(
        `/user-donations/${_id}?page=${page ? page : 1}`
      );
      return data;
    },
    {
      staleTime: 1000 * 60 * 10,
    }
  );
};

export const useGetDonationsByCategory = (category: string, page?: number) => {
  return useQuery(
    ["categories", category],
    async () => {
      const { data } = await api.get(`/categories/${category}`);
      return data;
    },
    {
      staleTime: 1000 * 60 * 10,
    }
  );
};

export const useGetTopDonations = () => {
  return useQuery(
    "top-donations",
    async () => {
      const { data } = await api.get("/top-donations");
      return data;
    },
    {
      staleTime: 1000 * 60 * 10,
    }
  );
};
