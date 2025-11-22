import { useQueryClient } from "@tanstack/vue-query";

export const useSwitchLang = () => {
  const { locale, locales, setLocale } = useI18n();
  const queryClient = useQueryClient();

  const switchLang = async (lang: "en" | "ar") => {
    await setLocale(lang);
    await nextTick();
    queryClient.invalidateQueries();
  };

  const getCurrentLocale = () => {
    return locale.value;
  };

  const getAvailableLocales = () => {
    return locales.value;
  };

  const isCurrentLocale = (lang: string) => {
    return locale.value === lang;
  };

  return {
    switchLang,
    getCurrentLocale,
    getAvailableLocales,
    isCurrentLocale,
    locales,
    locale: readonly(locale),
  };
};
