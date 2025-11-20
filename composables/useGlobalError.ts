export type GlobalError = {
  message?: string;
  status?: number;
};

export const useGlobalError = () =>
  useState<GlobalError | null>("globalError", () => null);
