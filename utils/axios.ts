import axios from "axios";
import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// Export a factory that creates an Axios instance at runtime.
// This avoids calling `useRuntimeConfig()` at module evaluation time
// which would trigger the "called outside of a plugin or setup" error.
export default function createApiAxios(): AxiosInstance {
  const apiAxios: AxiosInstance = axios.create({
    baseURL: useRuntimeConfig().public.baseURL,
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      Accept: "application/json",
    },
  });

  apiAxios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Response Interceptor
  apiAxios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (!error.response) {
        throw createError({
          statusCode: 503,
          statusMessage: "Network error. Please check your connection.",
        });
      }

      console.log("error.response", error.response);
    }
  );

  return apiAxios;
}
