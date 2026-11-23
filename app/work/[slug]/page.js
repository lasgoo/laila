import Link from "next/link";
import { notFound } from "next/navigation";
import { getProfile, getProject, getProjects } from "@/lib/content";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { images: [project.cover] },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const projects = getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const figma = project.figma ?? getProfile().figma;

  return (
    <article className="project">
      <header className="project-head wrap">
        <Link href="/#work" className="back">All work</Link>
        <h1 className="display">{project.title}</h1>
        <div className="project-intro">
          <p>{project.summary}</p>
          <dl>
            <div><dt>Type</dt><dd>{project.type}</dd></div>
            <div><dt>Tools</dt><dd>{project.tools.join(", ")}</dd></div>
            {figma && (
              <div><dt>Source</dt><dd><a href={figma} target="_blank" rel="noreferrer">Open in Figma</a></dd></div>
            )}
          </dl>
        </div>
      </header>

      {project.sections.map((section) => (
        <section key={section.title} className="gallery-section wrap">
          <div className="gallery-head">
            <h2>{section.title}</h2>
            {section.note && <p>{section.note}</p>}
          </div>
          <div className={`gallery gallery-${section.layout}`}>
            {section.images.map((src, i) => (
              <figure key={src}>
                {/* eslint-disable-next-line @next/next/no-img-element -- images are pre-optimised webp */}
                <img
                  src={src}
                  alt={`${project.title}, ${section.title}${section.images.length > 1 ? ` ${i + 1}` : ""}`}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </section>
      ))}

      <Link href={`/work/${next.slug}`} className="next">
        <span className="next-label">Next project</span>
        <span className="next-title">{next.title}</span>
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised webp */}
        <img src={next.cover} alt="" loading="lazy" />
      </Link>
    </article>
  );
}
