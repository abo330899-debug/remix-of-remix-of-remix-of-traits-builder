import { type Lang } from "@/i18n/translations";

interface Props {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LANGS: { code: Lang; label: string }[] = [
  { code: "tr", label: "TR" },
  { code: "en", label: "EN" },
  { code: "ar", label: "AR" },
  { code: "fa", label: "FA" },
];

export default function LanguageSwitcher({ lang, setLang }: Props) {
  return (
    <div className="lang-switcher">
      {LANGS.map((l) => (
        <button
          key={l.code}
          className={`lang-btn${lang === l.code ? " lang-btn--active" : ""}`}
          onClick={() => setLang(l.code)}
          aria-label={l.label}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
