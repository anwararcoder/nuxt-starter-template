import { useRouter } from "vue-router";

export type GlobalError = {
  message: string;
  status?: number;
};

export const useGlobalError = (
  autoClearOnRouteChange = true,
  enableDebug = false
) => {
  const router = useRouter();
  const error = useState<GlobalError | null>("globalError", () => null);

  const setError = (errorData: Partial<GlobalError> | null) => {
    if (errorData) {
      error.value = { ...error.value, ...errorData } as GlobalError;
      if (enableDebug) console.warn("GlobalError set:", error.value);
    } else {
      clearError();
    }
  };

  const clearError = () => {
    if (enableDebug && error.value) console.warn("GlobalError cleared");
    error.value = null;
  };

  const hasError = computed(() => !!error.value);

  if (autoClearOnRouteChange) {
    watch(
      () => router.currentRoute.value.fullPath,
      (newPath, oldPath) => {
        if (newPath !== oldPath && error.value) {
          clearError();
        }
      }
    );
  }

  return {
    error,
    hasError,
    setError,
    clearError,
  };
};
