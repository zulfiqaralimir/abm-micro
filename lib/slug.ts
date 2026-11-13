export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’'“”"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

export type TocItem = { id: string; label: string };

export function extractToc(mdx: string): TocItem[] {
  return mdx
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => l.slice(3).trim())
    .map((label) => ({ id: slugify(label), label }));
}

export function readingMinutes(mdx: string): number {
  const words = mdx.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}
