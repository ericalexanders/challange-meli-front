import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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

export const useGetItems = (query: Partial<SearchQuery>) => {
  return useQuery({
    queryKey: ["items", query],
    queryFn: () => getItems(query),
  });
};
