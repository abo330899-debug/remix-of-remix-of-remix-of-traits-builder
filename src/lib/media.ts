/**
 * إعدادات الوسائط المستضافة على Cloudflare R2 (Public Development URL)
 *
 * 1) ضع رابط الـ bucket العام هنا (مثل: https://pub-xxxx.r2.dev)
 *    أو عرّف VITE_R2_BASE_URL في متغيرات البيئة.
 * 2) أضف أسماء الملفات في القوائم بالأسفل.
 * 3) استخدم mediaUrl("folder/file.jpg") في أي مكان بالتطبيق.
 */

const ENV_BASE = (import.meta.env?.["VITE_R2_BASE_URL"] as string | undefined) ?? "";

/** رابط الـ bucket العام على R2 */
export const R2_BASE_URL = ENV_BASE || "";

/** هل تم ضبط الربط مع R2؟ */
export const isMediaConfigured = Boolean(R2_BASE_URL);

/** يبني رابطًا كاملًا لملف داخل الـ bucket */
export function mediaUrl(key: string): string {
  if (/^https?:\/\//i.test(key)) return key;
  const base = R2_BASE_URL.replace(/\/+$/, "");
  const path = key
    .replace(/^\/+/, "")
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  return base ? `${base}/${path}` : `/${path}`;
}

export type MediaItem = {
  /** مسار الملف داخل الـ bucket، مثال: "photos/sunset.jpg" */
  key: string;
  title?: string;
  /** صورة مصغّرة اختيارية (مسار داخل الـ bucket أو رابط كامل) */
  poster?: string;
};

/** الصور — أضف مسار كل ملف داخل الـ bucket */
export const photos: MediaItem[] = [
  // { key: "photos/sunset.jpg", title: "غروب" },
];

/** الفيديوهات */
export const videos: MediaItem[] = [
  // { key: "videos/clip.mp4", title: "مقطع", poster: "photos/clip-cover.jpg" },
];

/** الأغاني / الملفات الصوتية */
export const songs: MediaItem[] = [
  // { key: "songs/track.mp3", title: "أغنية" },
];
