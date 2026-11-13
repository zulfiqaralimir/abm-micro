import { slugify } from "./slug";

export type NarrationSection = { id: string; title: string; chunks: string[] };

// Turns chapter MDX into plain, speakable text, one entry per "## " section.
function clean(t: string): string {
  t = t.replace(/<(?:Card|Callout)\b[^>]*?title="([^"]*)"[^>]*>/g, (_m, a) => `\n${a}.\n`);
  t = t.replace(/<\/?[A-Z][A-Za-z]*[^>]*?\/?>/g, "");

  const out: string[] = [];
  let hdr: string[] | null = null;
  for (const l of t.split("\n")) {
    if (l.startsWith("|")) {
      const cells = l.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      if (cells.every((c) => /^[-: ]*$/.test(c))) continue;
      if (!hdr) { hdr = cells; continue; }
      out.push(`${cells[0]}. ` + cells.slice(1).map((c, i) => `${hdr![i + 1]}: ${c}`).join(". ") + ".");
    } else {
      hdr = null;
      out.push(l);
    }
  }
  t = out.join("\n");
  t = t.replace(/^###\s+(.*)$/gm, "$1.");
  t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, (_m, a: string) => (a.startsWith("http") ? "" : a));
  t = t.replace(/^>\s?/gm, "").replace(/^- /gm, "");
  t = t.replace(/\*+/g, "");
  t = t.replace(/ﷺ/g, ", peace be upon him,");
  t = t.replace("(2:3)", "(chapter 2, verse 3)").replace("(41:53)", "(chapter 41, verse 53)");
  t = t.replace("$4.6 billion", "4.6 billion dollars").replace("2007–08", "2007 to 2008");
  return t.replace(/\s*\n\s*/g, "\n").trim();
}

// Chrome's speech engine stops on long utterances, so feed it sentence-sized chunks.
function chunkify(text: string): string[] {
  const sentences = text.replace(/\n/g, " ").match(/[^.!?]+[.!?”"')]*\s*/g) ?? [text];
  const chunks: string[] = [];
  let cur = "";
  for (const s of sentences) {
    if ((cur + s).length > 220 && cur) { chunks.push(cur.trim()); cur = s; }
    else cur += s;
  }
  if (cur.trim()) chunks.push(cur.trim());
  return chunks;
}

export function buildNarration(mdx: string): NarrationSection[] {
  const parts = mdx.split(/^## /m);
  const sections: NarrationSection[] = [];
  const intro = clean(parts[0]);
  if (intro) sections.push({ id: "top", title: "Introduction", chunks: chunkify(intro) });
  for (const p of parts.slice(1)) {
    const nl = p.indexOf("\n");
    const title = p.slice(0, nl).trim();
    const m = title.match(/^(\d+)\.\s+(.*)$/);
    const spoken = m ? `Section ${m[1]}. ${m[2]}.` : `${title}.`;
    sections.push({ id: slugify(title), title, chunks: chunkify(`${spoken}\n${clean(p.slice(nl))}`) });
  }
  return sections;
}
