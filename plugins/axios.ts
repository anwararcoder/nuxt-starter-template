import axios from "axios";
import type {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  const axiosAPI = axios.create({
    baseURL: useRuntimeConfig().public.baseURL,
  });

  const globalError = useGlobalError();

  axiosAPI.defaults.headers.common["Cache-Control"] = "no-cache, no-store, must-revalidate";
  axiosAPI.defaults.headers.common["Pragma"] = "no-cache";
  axiosAPI.defaults.headers.common["Expires"] = "0";

  axiosAPI.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Response Interceptor
  axiosAPI.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const errorData = {
        message: error?.message ?? "No error message",
        status: error?.response?.status ?? undefined,
      };

      globalError.value = errorData;
      return Promise.reject(error);
    }
  );

  // Make axiosAPI globally available
  nuxtApp.provide("axiosAPI", axiosAPI);
});
