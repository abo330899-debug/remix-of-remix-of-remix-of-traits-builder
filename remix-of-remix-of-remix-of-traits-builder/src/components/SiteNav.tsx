import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { LANGS, useI18n } from "@/lib/i18n";

const ITEMS = [
  { to: "/home", key: "home", icon: "home" },
  { to: "/photos", key: "photos", icon: "photo_library" },
  { to: "/songs", key: "songs", icon: "graphic_eq" },
  { to: "/videos", key: "videos", icon: "movie" },
  { to: "/writings", key: "writings", icon: "auto_stories" },
  { to: "/journey", key: "journey", icon: "timeline" },
] as const;

function LanguageMenu() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = LANGS.find((l) => l.code === lang);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("language")}
        aria-expanded={open}
        className="flex h-10 shrink-0 items-center gap-2 rounded-full border border-primary/25 bg-surface-container-low/50 px-4 text-[11px] font-medium tracking-[0.18em] text-primary uppercase backdrop-blur-xl transition-colors hover:bg-primary/10"
      >
        <span className="material-symbols-outlined text-[18px] leading-none">language</span>
        {current?.short}
      </button>
      {open && (
        <div className="absolute end-0 top-12 z-50 w-40 overflow-hidden rounded-2xl border border-primary/20 bg-surface-container-low/90 p-1 shadow-2xl backdrop-blur-2xl">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                l.code === lang
                  ? "bg-primary/15 text-primary"
                  : "text-on-surface-variant hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <span>{l.label}</span>
              <span className="text-[10px] tracking-widest opacity-60">{l.short}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteNav() {
  const { t, rtl } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        dir={rtl ? "rtl" : "ltr"}
        className={`fixed inset-x-0 top-0 z-[90] transition-all duration-500 ${
          scrolled ? "backdrop-blur-2xl" : ""
        }`}
      >
        <div
          className={`mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 transition-all duration-500 md:mt-3 md:h-14 md:rounded-full md:border md:px-3 ${
            scrolled
              ? "border-primary/20 bg-surface-container-low/70 shadow-[0_8px_40px_rgba(0,210,255,0.12)]"
              : "border-transparent bg-surface-dim/40 md:bg-surface-container-low/30"
          } backdrop-blur-2xl`}
        >
          <Link
            to="/home"
            className="shrink-0 font-display-lg text-lg tracking-tight text-primary uppercase"
          >
            Nafsam
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex">
            {ITEMS.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-full px-3 py-1.5 text-[12px] tracking-wide whitespace-nowrap transition-colors ${
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-on-surface-variant hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="ms-auto flex items-center gap-2 md:ms-0">
            <LanguageMenu />
          </div>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav
        dir={rtl ? "rtl" : "ltr"}
        className="fixed inset-x-3 bottom-4 z-[90] flex items-center justify-between gap-1 rounded-full border border-primary/20 bg-surface-container-low/70 px-2 py-2 shadow-[0_10px_40px_rgba(0,210,255,0.15)] backdrop-blur-2xl md:hidden"
      >
        {ITEMS.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-label={t(item.key)}
              className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-full px-1 py-1.5 transition-colors ${
                active ? "bg-primary/15 text-primary" : "text-on-surface-variant"
              }`}
            >
              <span className="material-symbols-outlined text-[20px] leading-none">
                {item.icon}
              </span>
              <span className="w-full truncate text-center text-[9px] tracking-wide">
                {t(item.key)}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
