import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "content");
const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

// Set when the site is served from a sub-path, e.g. username.github.io/repo.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function getProfile() {
  const profile = readJson(path.join(root, "profile.json"));
  return { ...profile, cv: base + profile.cv };
}

// Each file in content/projects is one project; its file name is the URL slug
// and its images live in public/work/<slug>/.
export function getProjects() {
  const dir = path.join(root, "projects");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const slug = f.replace(/\.json$/, "");
      const data = readJson(path.join(dir, f));
      const url = (file) => `${base}/work/${slug}/${file}`;
      return {
        ...data,
        slug,
        cover: url("cover.webp"),
        pin: url(data.pin ?? "cover.webp"),
        sections: data.sections.map((s) => ({ ...s, images: s.images.map(url) })),
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug) {
  return getProjects().find((p) => p.slug === slug);
}
