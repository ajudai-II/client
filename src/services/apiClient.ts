import axios from "axios";

export function apiClient() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
  });

  return instance;
}
