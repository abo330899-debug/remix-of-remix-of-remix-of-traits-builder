/** مساعدات الاتصال بـ Cloudflare D1 و R2 (سيرفر فقط). */

const ACCOUNT_ID = "d2680f7c5ff39f8d9177a51dbf7fec75";
const DATABASE_ID = "e0d960bb-d30d-4590-a5a1-e7e860a8f6fb";

export type D1Row = Record<string, unknown>;

export async function d1Query(sql: string, params: unknown[] = []): Promise<D1Row[]> {
  const token = process.env["CLOUDFLARE_API_TOKEN"];
  if (!token) throw new Error("CLOUDFLARE_API_TOKEN missing");

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql, params }),
    },
  );

  const json = (await res.json()) as {
    success: boolean;
    errors?: { message: string }[];
    result?: { results?: D1Row[] }[];
  };

  if (!json.success) {
    throw new Error(json.errors?.map((e) => e.message).join(", ") || "D1 query failed");
  }
  return json.result?.[0]?.results ?? [];
}

export function r2PublicBase(): string {
  const raw = (process.env["R2_PUBLIC_BASE_URL"] ?? "").trim().replace(/\/+$/, "");
  if (!raw) return "";
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}

/** رابط عام بديل: قاعدة الوسائط القديمة (Cloudflare Pages) عند عدم تهيئة R2. */
export function legacyPublicBase(): string {
  const raw = (process.env["VITE_R2_BASE_URL"] ?? "").trim().replace(/\/+$/, "");
  if (!raw) return "";
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}

/** يبني رابط الملف: R2 أولًا، ثم القاعدة القديمة. */
export function mediaUrlForKey(key: string): string {
  const clean = key.replace(/^\/+/, "");
  if (!clean) return "";
  const r2 = r2PublicBase();
  if (r2) return `${r2}/${clean}`;
  const legacy = legacyPublicBase();
  return legacy ? `${legacy}/${clean}` : "";
}

export type MediaKind = "image" | "video" | "audio" | "text";

export function kindOf(filename: string): MediaKind {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  if (["jpg", "jpeg", "png", "webp", "gif", "avif", "heic"].includes(ext)) return "image";
  if (["mp4", "mov", "webm", "m4v", "avi", "mkv"].includes(ext)) return "video";
  if (["mp3", "m4a", "wav", "ogg", "aac"].includes(ext)) return "audio";
  return "text";
}
