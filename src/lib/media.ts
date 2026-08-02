/**
 * إعداد الوسائط المركزي — Cloudflare R2 (Public Development URL)
 *
 * 1) ضع رابط الـ bucket العام داخل متغير البيئة VITE_R2_BASE_URL
 *    مثال: VITE_R2_BASE_URL=https://pub-xxxx.r2.dev
 * 2) أضف الملفات في القوائم بالأسفل (images / videos / songs).
 * 3) لا تضع الرابط داخل الكود بشكل ثابت أبدًا.
 */

/** رابط الـ bucket العام على R2 (من متغيرات البيئة فقط) */
export const R2_BASE_URL: string =
  ((import.meta.env?.["VITE_R2_BASE_URL"] as string | undefined) ?? "").trim();

/** هل تم ضبط الربط مع R2؟ */
export const isMediaConfigured: boolean = R2_BASE_URL.length > 0;

/** رسالة موحّدة تُعرض عند غياب رابط R2 */
export const MEDIA_NOT_CONFIGURED_MESSAGE = "لم تتم إضافة رابط Cloudflare R2 بعد";

/** يبني رابطًا كاملًا لملف داخل الـ bucket ويمنع تكرار // */
export function mediaUrl(fileName: string): string {
  if (!fileName) return "";
  if (/^https?:\/\//i.test(fileName)) return fileName;
  const base = R2_BASE_URL.replace(/\/+$/, "");
  const path = fileName.replace(/^\/+/, "");
  return base ? `${base}/${path}` : `/${path}`;
}

export type MediaItem = {
  /** معرّف فريد */
  id: string;
  /** الاسم المعروض */
  title: string;
  /** اسم الملف داخل الـ bucket، مثال: "photos/sunset.jpg" */
  fileName: string;
  /** الرابط الكامل للملف */
  url: string;
  /** صورة مصغّرة (اسم ملف داخل الـ bucket أو رابط كامل) */
  thumbnail: string;
  /** التصنيف */
  category: string;
};

type MediaInput = {
  id: string;
  title: string;
  fileName: string;
  thumbnail?: string;
  category?: string;
};

function buildItem(input: MediaInput, useSelfAsThumb: boolean): MediaItem {
  const url = mediaUrl(input.fileName);
  return {
    id: input.id,
    title: input.title,
    fileName: input.fileName,
    url,
    thumbnail: input.thumbnail ? mediaUrl(input.thumbnail) : useSelfAsThumb ? url : "",
    category: input.category ?? "عام",
  };
}

/* ------------------------------------------------------------------ */
/*  الصور — أضف كل صورة جديدة هنا                                      */
/* ------------------------------------------------------------------ */
const IMAGE_SOURCES: MediaInput[] = [
  // { id: "img-1", title: "غروب", fileName: "photos/sunset.jpg", category: "طبيعة" },
];

/* ------------------------------------------------------------------ */
/*  الفيديوهات — أضف كل فيديو جديد هنا                                 */
/* ------------------------------------------------------------------ */
const VIDEO_SOURCES: MediaInput[] = [
  // { id: "vid-1", title: "مقطع", fileName: "videos/clip.mp4", thumbnail: "photos/clip-cover.jpg", category: "ذكريات" },
];

/* ------------------------------------------------------------------ */
/*  الأغاني — أضف كل أغنية جديدة هنا                                   */
/* ------------------------------------------------------------------ */
const SONG_SOURCES: MediaInput[] = [
  // { id: "song-1", title: "أغنية", fileName: "songs/track.mp3", thumbnail: "photos/cover.jpg", category: "هادئ" },
];

export const images: MediaItem[] = IMAGE_SOURCES.map((i) => buildItem(i, true));
export const videos: MediaItem[] = VIDEO_SOURCES.map((i) => buildItem(i, false));
export const songs: MediaItem[] = SONG_SOURCES.map((i) => buildItem(i, false));

/** أسماء التصنيفات المتاحة داخل قائمة معيّنة */
export function categoriesOf(items: MediaItem[]): string[] {
  return Array.from(new Set(items.map((i) => i.category))).sort();
}

/** بحث بالاسم + فلترة بالتصنيف */
export function filterMedia(items: MediaItem[], query: string, category: string): MediaItem[] {
  const q = query.trim().toLowerCase();
  return items.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    const matchesQuery =
      !q || item.title.toLowerCase().includes(q) || item.fileName.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
}

/** يحوّل الثواني إلى m:ss */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}