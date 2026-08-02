# ربط المشروع مع Cloudflare R2

## 1) أين أضع رابط R2؟

الرابط لا يوضع داخل الكود إطلاقًا، بل في متغير بيئة اسمه `VITE_R2_BASE_URL`.

- محليًا: أنشئ ملف `.env` بجانب `package.json` (انسخ `.env.example`):

```
VITE_R2_BASE_URL=https://pub-xxxxxxxx.r2.dev
```

- في Lovable: أضِف المتغير من إعدادات المشروع (Environment Variables).
- في Cloudflare Pages: Settings → Environment variables → أضف `VITE_R2_BASE_URL`.

إذا لم يوجد المتغير، تعرض كل الصفحات الرسالة: **«لم تتم إضافة رابط Cloudflare R2 بعد»**.

> تذكير: يجب أن يكون الـ bucket عامًا (Public Development URL) أو خلف دومين مخصص، مع تفعيل CORS للقراءة.

## 2) كيف أضيف صورة جديدة؟

ارفع الصورة إلى الـ bucket (مثلًا داخل مجلد `photos/`)، ثم افتح `src/lib/media.ts` وأضف عنصرًا داخل `IMAGE_SOURCES`:

```ts
const IMAGE_SOURCES: MediaInput[] = [
  { id: "img-1", title: "غروب", fileName: "photos/sunset.jpg", category: "طبيعة" },
];
```

## 3) كيف أضيف فيديو جديد؟

ارفع الفيديو (يفضّل MP4/H.264 ليعمل على الآيفون) وأضفه داخل `VIDEO_SOURCES`:

```ts
const VIDEO_SOURCES: MediaInput[] = [
  {
    id: "vid-1",
    title: "مقطع البداية",
    fileName: "videos/clip.mp4",
    thumbnail: "photos/clip-cover.jpg",
    category: "ذكريات",
  },
];
```

## 4) كيف أضيف أغنية جديدة؟

ارفع الملف الصوتي (MP3/AAC) وأضفه داخل `SONG_SOURCES`:

```ts
const SONG_SOURCES: MediaInput[] = [
  { id: "song-1", title: "أغنيتنا", fileName: "songs/track.mp3", thumbnail: "photos/cover.jpg", category: "هادئ" },
];
```

الحقول: `id` (فريد) — `title` (الاسم المعروض) — `fileName` (المسار داخل الـ bucket) — `thumbnail` (اختياري) — `category` (يظهر كفلتر).
الرابط الكامل يُبنى تلقائيًا: `${VITE_R2_BASE_URL}/${fileName}` بدون تكرار `//`.

## 5) الصفحات

| الصفحة | المسار | المزايا |
| --- | --- | --- |
| الصور | `/photos` | شبكة متجاوبة، بحث، تصنيفات، Lazy loading، Skeleton، عرض كامل مع زر رجوع، معالجة خطأ التحميل |
| الفيديوهات | `/videos` | مشغل HTML5، صورة مصغّرة، بحث وتصنيفات، إيقاف الفيديو السابق تلقائيًا |
| الأغاني | `/songs` | قائمة تشغيل، مشغل ثابت أسفل الشاشة يستمر أثناء التنقل، شريط تقدم، التالي/السابق |

## 6) النشر على Cloudflare Pages

1. ارفع المشروع إلى GitHub.
2. Cloudflare → Workers & Pages → Create → Pages → Connect to Git.
3. الإعدادات:
   - Build command: `npm run build`
   - Build output directory: `dist/client`
4. أضف متغير البيئة `VITE_R2_BASE_URL` لبيئتي Production و Preview.
5. Deploy. عند تغيير المتغير أعد البناء لأن متغيرات `VITE_` تُدمج وقت البناء.

## 7) فحص محلي

```
npm install
npm run build
npm run preview
```
