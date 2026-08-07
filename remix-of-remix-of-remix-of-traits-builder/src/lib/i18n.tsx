import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DICT, type Lang } from "./translations";

export type { Lang };

export const LANGS: { code: Lang; label: string; short: string; rtl: boolean }[] = [
  { code: "tr", label: "Türkçe", short: "TR", rtl: false },
  { code: "en", label: "English", short: "EN", rtl: false },
  { code: "ar", label: "العربية", short: "AR", rtl: true },
  { code: "fa", label: "فارسی", short: "FA", rtl: true },
];

const UI: Record<string, Record<Lang, string>> = {
  home: { tr: "Ana Sayfa", en: "Home", ar: "الرئيسية", fa: "خانه" },
  photos: { tr: "Fotoğraflar", en: "Photos", ar: "الصور", fa: "عکس‌ها" },
  songs: { tr: "Şarkılar", en: "Songs", ar: "الأغاني", fa: "آهنگ‌ها" },
  videos: { tr: "Videolar", en: "Videos", ar: "الفيديوهات", fa: "ویدیوها" },
  writings: { tr: "Yazılar", en: "Writings", ar: "الكتابات", fa: "نوشته‌ها" },
  journey: { tr: "Yolculuk", en: "Journey", ar: "الرحلة", fa: "سفر" },
  language: { tr: "Dil", en: "Language", ar: "اللغة", fa: "زبان" },
  menu: { tr: "Menü", en: "Menu", ar: "القائمة", fa: "منو" },
  logout: { tr: "Çıkış", en: "Log out", ar: "خروج", fa: "خروج" },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  rtl: boolean;
  t: (key: string) => string;
  translateText: (text: string) => string;
};

const I18nContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "nafsam.lang";

export function translate(text: string, lang: Lang): string {
  const trimmed = text.trim();
  if (!trimmed) return text;
  const entry = DICT[trimmed] ?? DICT[trimmed.replace(/&/g, "&amp;")];
  if (entry) return text.replace(trimmed, entry[lang]);
  return text;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && LANGS.some((l) => l.code === stored)) setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const rtl = LANGS.find((l) => l.code === lang)?.rtl ?? false;

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      rtl,
      t: (key: string) => UI[key]?.[lang] ?? key,
      translateText: (text: string) => translate(text, lang),
    }),
    [lang, setLang, rtl],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
