import axios from "axios";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { DataResponse } from "@/types/result";
import type { ItemDetails } from "@/types/itemDetails";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const Axios = axios.create({
  baseURL: API_URL,
});

export interface SearchQuery {
  search: string;
  limit?: number;
  offset?: number;
}

const getItems = async (query: Partial<SearchQuery>) => {
  const { search, ...rest } = query;
  const response = await Axios.get("/items", {
    params: {
      q: search,
      ...rest,
    },
  });
  return response.data;
};

const getItemDetails = async (id: string) => {
  const response = await Axios.get(`/items/${id}`);
  return response.data;
};

// ----------------------------------------------- //
export const useGetItems = (searchQuery: Partial<SearchQuery>): UseQueryResult<DataResponse> => {
  return useQuery({
    queryKey: ["items", searchQuery],
    queryFn: () => getItems(searchQuery),
    enabled: !!searchQuery.search,
  });
};

export const useGetItemsDetails = (id: string): UseQueryResult<ItemDetails> => {
  return useQuery({
    queryKey: ["item-details", id],
    queryFn: () => getItemDetails(id),
    enabled: !!id,
  });
};
