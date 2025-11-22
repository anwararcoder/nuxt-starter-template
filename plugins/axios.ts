import axios from "axios";
import type {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosInstance,
} from "axios";
import type { Composer } from "vue-i18n";

export default defineNuxtPlugin((nuxtApp) => {
  // Create an Axios instance
  const axiosAPI: AxiosInstance = axios.create({
    baseURL: useRuntimeConfig().public.baseURL,
  });

  const { setError } = useGlobalError();
  const i18n = nuxtApp.$i18n as Composer;

  // Default headers
  axiosAPI.defaults.headers.common["Cache-Control"] =
    "no-cache, no-store, must-revalidate";
  axiosAPI.defaults.headers.common["Pragma"] = "no-cache";
  axiosAPI.defaults.headers.common["Expires"] = "0";

  // Watch locale changes
  watch(
    () => i18n.locale.value,
    (newLocale) => {
      axiosAPI.defaults.headers.common["Accept-Language"] = newLocale;
    },
    { immediate: true }
  );

  // Request interceptor
  axiosAPI.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const currentLocale = i18n.locale.value || "en";
      config.headers["Accept-Language"] = currentLocale;
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Response interceptor
  axiosAPI.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const errorData = {
        message: error?.message ?? "No error message",
        status: error?.response?.status,
      };
      setError(errorData);
      return Promise.reject(error);
    }
  );

  nuxtApp.provide("axiosAPI", axiosAPI);
});

declare module "#app" {
  interface NuxtApp {
    $axiosAPI: AxiosInstance;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $axiosAPI: AxiosInstance;
  }
}
