import { useState, useEffect } from "react";
import { type Lang, translations } from "@/i18n/translations";

function getSavedLang(): Lang {
  try {
    const saved = localStorage.getItem("site_lang") as Lang | null;
    if (saved && saved in translations) return saved;
  } catch {
    /* storage blocked */
  }
  return "tr";
}

export function useLang() {
  const [lang, setLangState] = useState<Lang>(getSavedLang);
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    try {
      localStorage.setItem("site_lang", lang);
    } catch {
      /* storage blocked */
    }
  }, [lang, t.dir]);

  const setLang = (l: Lang) => setLangState(l);

  return { lang, setLang, t };
}
