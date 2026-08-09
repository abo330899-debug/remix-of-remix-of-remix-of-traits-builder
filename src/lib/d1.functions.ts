import { createServerFn } from "@tanstack/react-start";
import { d1Query, kindOf, r2PublicBase, type MediaKind } from "./d1.server";

export type ArchiveFile = {
  id: number;
  filename: string;
  key: string;
  url: string;
  kind: MediaKind;
  text: string | null;
  createdAt: string | null;
};

export type ArchiveMessage = {
  id: number;
  role: string;
  content: string;
  createdAt: string | null;
};

export type ArchiveData = {
  files: ArchiveFile[];
  messages: ArchiveMessage[];
  baseConfigured: boolean;
  error: string | null;
};

export const getArchive = createServerFn({ method: "GET" }).handler(
  async (): Promise<ArchiveData> => {
    const base = r2PublicBase();
    try {
      const [fileRows, messageRows] = await Promise.all([
        d1Query("select id, filename, r2_key, extracted_text, created_at from files order by id desc"),
        d1Query("select id, role, content, created_at from messages order by id desc"),
      ]);

      const files: ArchiveFile[] = fileRows.map((r) => {
        const filename = String(r["filename"] ?? "");
        const key = String(r["r2_key"] ?? "").replace(/^\/+/, "");
        return {
          id: Number(r["id"] ?? 0),
          filename,
          key,
          url: base ? `${base}/${key}` : "",
          kind: kindOf(filename || key),
          text: (r["extracted_text"] as string | null) ?? null,
          createdAt: (r["created_at"] as string | null) ?? null,
        };
      });

      const messages: ArchiveMessage[] = messageRows.map((r) => ({
        id: Number(r["id"] ?? 0),
        role: String(r["role"] ?? ""),
        content: String(r["content"] ?? ""),
        createdAt: (r["created_at"] as string | null) ?? null,
      }));

      return { files, messages, baseConfigured: Boolean(base), error: null };
    } catch (e) {
      return {
        files: [],
        messages: [],
        baseConfigured: Boolean(base),
        error: e instanceof Error ? e.message : "unknown error",
      };
    }
  },
);
