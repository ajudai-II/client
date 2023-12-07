import { useQuery } from "react-query";
import { api } from "@/services/api";

export const useGetUserById = (_id: string) => {
  return useQuery(["user", _id], async () => {
    const { data } = await api.get(`/get/${_id}`);
    return data;
  }, {
    staleTime: 1000 * 60 * 10
  });
}