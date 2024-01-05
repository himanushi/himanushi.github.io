import { signal } from "@preact/signals";

export const blogList = signal<string[]>([]);

export const blogContents = signal<{
  [key: string]: { content: string | null };
}>({});
