import type { ProductsResponse } from "~/types";
import type { AxiosInstance } from "axios";

export const getProducts = async (
  limit = 10,
  page = 1,
  sortBy = "",
  order = "",
  search = ""
): Promise<ProductsResponse> => {
  const { $axiosAPI: axiosAPI } = useNuxtApp() as unknown as { $axiosAPI: AxiosInstance };
  const { data } = await axiosAPI.get(
    `/products?limit=${limit}&page=${page}&sortBy=${sortBy}&order=${order}&search=${search}`
  );
  return data;
};
