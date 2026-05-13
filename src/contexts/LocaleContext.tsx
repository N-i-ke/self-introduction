import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Locale = "ja" | "en";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
}

const STORAGE_KEY = "locale";

const isLocale = (value: unknown): value is Locale => value === "ja" || value === "en";

const readStoredLocale = (): Locale => {
  if (typeof window === "undefined") return "ja";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // localStorage が使えない環境 (private mode 等) はデフォルトにフォールバック
  }
  return "ja";
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  children: React.ReactNode;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // 永続化失敗は致命ではないので無視
    }
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextValue => {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
};
