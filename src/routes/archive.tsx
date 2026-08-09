import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useState } from "react";
import { getArchive, type ArchiveFile } from "@/lib/d1.functions";
import { SiteNav } from "@/components/SiteNav";

const archiveQuery = queryOptions({
  queryKey: ["archive"],
  queryFn: () => getArchive(),
});

export const Route = createFileRoute("/archive")({
  loader: ({ context }) => {
    void context.queryClient.ensureQueryData(archiveQuery);
  },
  head: () => ({
    meta: [
      { title: "الأرشيف السحابي — صور وفيديوهات وكتابات" },
      {
        name: "description",
        content:
          "أرشيف الوسائط والكتابات المخزّنة سحابيًا: صور وفيديوهات من التخزين، ونصوص محفوظة في قاعدة البيانات.",
      },
      { property: "og:title", content: "الأرشيف السحابي" },
      {
        property: "og:description",
        content: "صور وفيديوهات وكتابات محفوظة سحابيًا في مكان واحد.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArchivePage,
});

type Tab = "media" | "writings";

function MediaCard({ item }: { item: ArchiveFile }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="group overflow-hidden rounded-3xl border border-primary/15 bg-surface-container-low/50 backdrop-blur-xl">
      <div className="relative aspect-square w-full overflow-hidden bg-surface-container/60">
        {!item.url || failed ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[28px] opacity-60">
              {item.kind === "video" ? "movie" : "image_not_supported"}
            </span>
            <span className="px-3 text-center text-[11px] opacity-70">
              {item.url ? "تعذّر تحميل الملف" : "رابط التخزين غير مُهيّأ"}
            </span>
          </div>
        ) : item.kind === "video" ? (
          <video
            src={item.url}
            controls
            preload="metadata"
            playsInline
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : item.kind === "audio" ? (
          <div className="flex h-full items-center justify-center p-4">
            <audio src={item.url} controls className="w-full" onError={() => setFailed(true)} />
          </div>
        ) : (
          <img
            src={item.url}
            alt={item.filename}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <figcaption className="space-y-1 p-3">
        <p className="truncate text-sm text-on-surface">{item.filename || item.key}</p>
        {item.createdAt && (
          <p className="text-[11px] tracking-wide text-on-surface-variant opacity-70">
            {item.createdAt}
          </p>
        )}
      </figcaption>
    </figure>
  );
}

function ArchivePage() {
  const { data } = useSuspenseQuery(archiveQuery);
  const [tab, setTab] = useState<Tab>("media");

  const media = data.files.filter((f) => f.kind !== "text");
  const texts = data.files.filter((f) => f.kind === "text" && f.text);

  return (
    <div className="min-h-dvh bg-surface pb-24" dir="rtl">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl px-4 pt-24 sm:px-6">
        <header className="space-y-3">
          <p className="text-[11px] font-medium tracking-[0.3em] text-primary uppercase">
            cloud archive
          </p>
          <h1 className="text-3xl font-semibold text-on-surface sm:text-4xl">الأرشيف السحابي</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-on-surface-variant">
            الصور والفيديوهات تُقرأ من التخزين السحابي، والكتابات من قاعدة البيانات.
          </p>
        </header>

        {data.error && (
          <p className="mt-6 rounded-2xl border border-error/30 bg-error/10 p-4 text-sm text-on-surface">
            تعذّر الاتصال بقاعدة البيانات: {data.error}
          </p>
        )}

        <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
          {(
            [
              { id: "media" as Tab, label: `الوسائط (${media.length})` },
              { id: "writings" as Tab, label: `الكتابات (${data.messages.length + texts.length})` },
            ]
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs tracking-wide transition-colors ${
                tab === t.id
                  ? "border-primary/40 bg-primary/15 text-primary"
                  : "border-primary/15 text-on-surface-variant hover:bg-primary/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "media" ? (
          media.length === 0 ? (
            <p className="mt-10 rounded-3xl border border-primary/15 bg-surface-container-low/40 p-6 text-sm text-on-surface-variant">
              لا توجد ملفات وسائط مسجّلة في قاعدة البيانات بعد.
              {!data.baseConfigured && " كما أن رابط التخزين العام غير مُهيّأ."}
            </p>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {media.map((item) => (
                <MediaCard key={item.id} item={item} />
              ))}
            </div>
          )
        ) : (
          <div className="mt-8 space-y-4">
            {data.messages.length === 0 && texts.length === 0 && (
              <p className="rounded-3xl border border-primary/15 bg-surface-container-low/40 p-6 text-sm text-on-surface-variant">
                لا توجد كتابات محفوظة بعد.
              </p>
            )}
            {data.messages.map((m) => (
              <article
                key={`m-${m.id}`}
                className="rounded-3xl border border-primary/15 bg-surface-container-low/50 p-5 backdrop-blur-xl"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-[10px] tracking-[0.2em] text-primary uppercase">
                    {m.role}
                  </span>
                  {m.createdAt && (
                    <span className="text-[11px] text-on-surface-variant opacity-70">
                      {m.createdAt}
                    </span>
                  )}
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-on-surface">
                  {m.content}
                </p>
              </article>
            ))}
            {texts.map((f) => (
              <article
                key={`f-${f.id}`}
                className="rounded-3xl border border-primary/15 bg-surface-container-low/50 p-5 backdrop-blur-xl"
              >
                <h2 className="mb-2 text-sm font-medium text-primary">{f.filename}</h2>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-on-surface">
                  {f.text}
                </p>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
