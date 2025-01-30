import axios from "axios";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { DataResponse } from "@/types/result";

const API_URL = "http://localhost:3000/api";
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

// HOOKS WITH REACT QUERY
// ----------------------------------------------- //

export const useGetItems = (query: Partial<SearchQuery>): UseQueryResult<DataResponse> => {
  return useQuery({
    queryKey: ["items", query],
    queryFn: () => getItems(query),
  });
};
