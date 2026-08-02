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
  { key: "https://images.unsplash.com/photo-1517816743773-6e0fd5183646?w=800&q=80", title: "لقاء منتصف الليل" },
  { key: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80", title: "ضباب الصباح" },
  { key: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80", title: "وادي الصمت" },
  { key: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80", title: "أول ضوء" },
];

/** الفيديوهات */
export const videos: MediaItem[] = [
  {
    key: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "عينة فيديو",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80",
  },
];

/** الأغاني / الملفات الصوتية */
export const songs: MediaItem[] = [
  {
    key: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    title: "عينة صوتية",
  },
];
