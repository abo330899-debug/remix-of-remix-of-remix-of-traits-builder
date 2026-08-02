/**
 * إعدادات الوسائط المستضافة على Cloudflare R2
 *
 * 1) ضع رابط الـ bucket العام هنا (مثل: https://pub-xxxx.r2.dev أو media.yourdomain.com)
 * 2) أضف أسماء الملفات في القوائم بالأسفل
 * 3) استخدم mediaUrl("folder/file.jpg") في أي مكان بالتطبيق
 */

export const R2_BASE_URL = "";

/** يبني رابطًا كاملًا لملف داخل الـ bucket */
export function mediaUrl(key: string): string {
  if (/^https?:\/\//i.test(key)) return key;
  const base = R2_BASE_URL.replace(/\/+$/, "");
  const path = key.replace(/^\/+/, "");
  return base ? `${base}/${path}` : `/${path}`;
}

export type MediaItem = {
  /** مسار الملف داخل الـ bucket، مثال: "photos/sunset.jpg" */
  key: string;
  title?: string;
  /** صورة مصغّرة اختيارية (مسار داخل الـ bucket أو رابط كامل) */
  poster?: string;
};

/** الصور */
export const photos: MediaItem[] = [];

/** الفيديوهات */
export const videos: MediaItem[] = [];

/** الأغاني / الملفات الصوتية */
export const songs: MediaItem[] = [];
