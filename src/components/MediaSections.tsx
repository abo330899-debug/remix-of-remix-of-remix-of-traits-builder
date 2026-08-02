import { useMemo, useRef, useState } from "react";
import {
  MEDIA_NOT_CONFIGURED_MESSAGE,
  categoriesOf,
  filterMedia,
  images,
  isMediaConfigured,
  songs,
  videos,
  type MediaItem,
} from "@/lib/media";
import { useAudioPlayer } from "@/components/media/AudioPlayer";

/* ---------------------------------- shell --------------------------------- */

function Toolbar({
  query,
  setQuery,
  category,
  setCategory,
  categories,
}: {
  query: string;
  setQuery: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  categories: string[];
}) {
  return (
    <div className="mt-6 flex flex-col gap-3">
      <label className="relative block">
        <span className="sr-only">بحث بالاسم</span>
        <span className="material-symbols-outlined pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant/60">
          search
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث بالاسم..."
          className="h-12 w-full rounded-2xl border border-primary/20 bg-white/[0.03] px-4 pe-11 text-sm text-on-surface outline-none backdrop-blur-xl transition-colors placeholder:text-on-surface-variant/40 focus:border-primary/60"
        />
      </label>
      {categories.length > 1 && (
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {["all", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs transition-colors ${
                category === c
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-white/10 text-on-surface-variant hover:border-primary/30 hover:text-primary"
              }`}
            >
              {c === "all" ? "الكل" : c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SectionShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section dir="rtl" className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
      <h2 className="text-2xl font-semibold tracking-tight text-primary md:text-3xl">{title}</h2>
      <p className="mt-2 text-sm text-on-surface-variant">{subtitle}</p>
      {children}
    </section>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="mt-8 rounded-2xl border border-primary/20 bg-white/[0.03] p-6 text-sm text-on-surface-variant backdrop-blur-xl">
      {text}
    </div>
  );
}

function useMediaFilters(items: MediaItem[]) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const categories = useMemo(() => categoriesOf(items), [items]);
  const filtered = useMemo(() => filterMedia(items, query, category), [items, query, category]);
  return { query, setQuery, category, setCategory, categories, filtered };
}

/* ---------------------------------- photos -------------------------------- */

function PhotoTile({ item, onOpen }: { item: MediaItem; onOpen: () => void }) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-start backdrop-blur-xl"
    >
      {state === "loading" && <div className="absolute inset-0 animate-pulse bg-white/5" />}
      {state === "error" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-on-surface-variant/70">
          <span className="material-symbols-outlined">broken_image</span>
          <span className="px-2 text-center text-[11px]">تعذّر تحميل الصورة</span>
        </div>
      ) : (
        <img
          src={item.url}
          alt={item.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setState("ready")}
          onError={() => setState("error")}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
            state === "ready" ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/80 to-transparent px-3 py-2 text-xs text-on-surface">
        {item.title}
      </span>
    </button>
  );
}

export function PhotosSection() {
  const { query, setQuery, category, setCategory, categories, filtered } = useMediaFilters(images);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex === null ? null : (filtered[openIndex] ?? null);

  return (
    <SectionShell title="الصور" subtitle="معروضة مباشرة من Cloudflare R2">
      {!isMediaConfigured ? (
        <EmptyState text={MEDIA_NOT_CONFIGURED_MESSAGE} />
      ) : (
        <>
          <Toolbar
            query={query}
            setQuery={setQuery}
            category={category}
            setCategory={setCategory}
            categories={categories}
          />
          {filtered.length === 0 ? (
            <EmptyState text="لا توجد صور مطابقة." />
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((item, i) => (
                <PhotoTile key={item.id} item={item} onOpen={() => setOpenIndex(i)} />
              ))}
            </div>
          )}
        </>
      )}

      {active && (
        <div
          dir="rtl"
          className="fixed inset-0 z-[120] flex flex-col bg-black/95 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between gap-3 px-4 pt-[max(env(safe-area-inset-top),1rem)] pb-3">
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              className="flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-xs text-primary"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              رجوع
            </button>
            <span className="min-w-0 truncate text-sm text-on-surface">{active.title}</span>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center p-4">
            <img
              src={active.url}
              alt={active.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </SectionShell>
  );
}

/* ---------------------------------- videos -------------------------------- */

export function VideosSection() {
  const { query, setQuery, category, setCategory, categories, filtered } = useMediaFilters(videos);
  const refs = useRef<Record<string, HTMLVideoElement | null>>({});

  const handlePlay = (id: string) => {
    Object.entries(refs.current).forEach(([key, el]) => {
      if (key !== id && el && !el.paused) el.pause();
    });
  };

  return (
    <SectionShell title="الفيديوهات" subtitle="بث مباشر من Cloudflare R2">
      {!isMediaConfigured ? (
        <EmptyState text={MEDIA_NOT_CONFIGURED_MESSAGE} />
      ) : (
        <>
          <Toolbar
            query={query}
            setQuery={setQuery}
            category={category}
            setCategory={setCategory}
            categories={categories}
          />
          {filtered.length === 0 ? (
            <EmptyState text="لا توجد فيديوهات مطابقة." />
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
                >
                  <video
                    ref={(el) => {
                      refs.current[item.id] = el;
                    }}
                    controls
                    playsInline
                    preload="metadata"
                    poster={item.thumbnail || undefined}
                    src={item.url}
                    onPlay={() => handlePlay(item.id)}
                    className="aspect-video w-full bg-black"
                  />
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-2">
                    <p className="truncate text-sm text-on-surface">{item.title}</p>
                    <span className="shrink-0 rounded-full border border-primary/20 px-2 py-0.5 text-[10px] text-primary">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </SectionShell>
  );
}

/* ---------------------------------- songs --------------------------------- */

export function SongsSection() {
  const { query, setQuery, category, setCategory, categories, filtered } = useMediaFilters(songs);
  const { current, playing, play, toggle } = useAudioPlayer();

  return (
    <SectionShell title="الأغاني" subtitle="ملفات صوتية من Cloudflare R2">
      {!isMediaConfigured ? (
        <EmptyState text={MEDIA_NOT_CONFIGURED_MESSAGE} />
      ) : (
        <>
          <Toolbar
            query={query}
            setQuery={setQuery}
            category={category}
            setCategory={setCategory}
            categories={categories}
          />
          {filtered.length === 0 ? (
            <EmptyState text="لا توجد أغانٍ مطابقة." />
          ) : (
            <ul className="mt-6 flex flex-col gap-2 pb-32">
              {filtered.map((item) => {
                const isCurrent = current?.id === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => (isCurrent ? toggle() : play(item, filtered))}
                      className={`grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border px-3 py-3 text-start transition-colors ${
                        isCurrent
                          ? "border-primary/50 bg-primary/10"
                          : "border-white/10 bg-white/[0.03] hover:border-primary/30"
                      }`}
                    >
                      <span className="material-symbols-outlined shrink-0 rounded-full bg-primary/15 p-2 text-primary">
                        {isCurrent && playing ? "pause" : "play_arrow"}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm text-on-surface">{item.title}</span>
                        <span className="block truncate text-[11px] text-on-surface-variant">
                          {item.category}
                        </span>
                      </span>
                      {isCurrent && (
                        <span className="shrink-0 text-[10px] tracking-widest text-primary">
                          الآن
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </SectionShell>
  );
}