import { isMediaConfigured, mediaUrl, photos, songs, videos, type MediaItem } from "@/lib/media";

function fileLabel(item: MediaItem) {
  if (item.title) return item.title;
  const name = item.key.split("/").pop() ?? item.key;
  return name.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ");
}

function SectionShell({
  title,
  subtitle,
  empty,
  children,
}: {
  title: string;
  subtitle: string;
  empty: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="relative z-10 w-full max-w-6xl px-6 py-16 mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#a5e7ff]">{title}</h2>
      <p className="mt-2 text-sm text-[#e5e2e1]/60">{subtitle}</p>
      {empty ? (
        <div className="mt-8 rounded-xl border border-[#a5e7ff]/20 bg-white/[0.03] backdrop-blur-xl p-6 text-sm text-[#e5e2e1]/70">
          {isMediaConfigured
            ? "لا توجد ملفات مضافة بعد في هذا القسم."
            : "لم يتم ربط Cloudflare R2 بعد — أضف الرابط العام في src/lib/media.ts."}
        </div>
      ) : (
        children
      )}
    </section>
  );
}

export function PhotosSection() {
  return (
    <SectionShell title="الصور" subtitle="معروضة مباشرة من Cloudflare R2" empty={photos.length === 0}>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((item) => (
          <figure
            key={item.key}
            className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
          >
            <img
              src={mediaUrl(item.key)}
              alt={fileLabel(item)}
              loading="lazy"
              className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="px-3 py-2 text-xs text-[#e5e2e1]/70 truncate">{fileLabel(item)}</figcaption>
          </figure>
        ))}
      </div>
    </SectionShell>
  );
}

export function VideosSection() {
  return (
    <SectionShell title="الفيديوهات" subtitle="بث مباشر من Cloudflare R2" empty={videos.length === 0}>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((item) => (
          <div
            key={item.key}
            className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
          >
            <video
              controls
              preload="metadata"
              playsInline
              poster={item.poster ? mediaUrl(item.poster) : undefined}
              src={mediaUrl(item.key)}
              className="w-full aspect-video bg-black"
            />
            <p className="px-3 py-2 text-xs text-[#e5e2e1]/70 truncate">{fileLabel(item)}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function SongsSection() {
  return (
    <SectionShell title="الأغاني" subtitle="ملفات صوتية من Cloudflare R2" empty={songs.length === 0}>
      <ul className="mt-8 flex flex-col gap-4">
        {songs.map((item) => (
          <li
            key={item.key}
            className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 flex flex-col gap-3"
          >
            <span className="text-sm text-[#e5e2e1]">{fileLabel(item)}</span>
            <audio controls preload="none" src={mediaUrl(item.key)} className="w-full" />
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
