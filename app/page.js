import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Desk from "@/components/Desk";
import { getProfile, getProjects } from "@/lib/content";

export default function Home() {
  const profile = getProfile();
  const projects = getProjects();

  return (
    <>
      <section className="hero">
        <h1 className="hero-name">{profile.displayName ?? profile.name}</h1>
        <Desk projects={projects} />
        <div className="hero-foot">
          <p>
            {profile.role} and {profile.alsoKnownFor.toLowerCase()}
            {profile.currently && <>, currently at {profile.currently.company}</>}.
          </p>
          <p className="hint">Drag the work around. Click a piece to open it.</p>
        </div>
      </section>

      <section id="work" className="work wrap">
        <h2 className="display">Work</h2>
        <ul className="work-list">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`} className="work-item">
                <span className="work-img">
                  {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised webp */}
                  <img src={p.cover} alt="" loading="lazy" />
                </span>
                <span className="work-title">{p.title}</span>
                <span className="work-type">{p.type}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="about" className="about wrap">
        <p className="statement">{profile.intro}</p>
        <div className="about-cols">
          <div>
            <h2>Skills</h2>
            <p>{profile.skills.join(", ")}</p>
          </div>
          <div>
            <h2>Tools</h2>
            <p>{profile.tools.join(", ")}</p>
          </div>
          <div>
            <h2>Education</h2>
            <ul>
              {profile.education.map((e) => (
                <li key={e.title}>{e.title}{e.grade && `, ${e.grade}`}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Certifications</h2>
            <ul>{profile.certifications.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </div>
      </section>

      <section id="experience" className="experience wrap">
        <h2 className="display">Experience</h2>
        {profile.experience.map((job) => (
          <article key={job.role + job.period} className="job">
            <div>
              <h3>{job.role}</h3>
              <p className="job-sub">{[job.company, job.period].filter(Boolean).join(", ")}</p>
            </div>
            <ul>{job.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          </article>
        ))}
      </section>

      <section id="contact" className="contact">
        <div className="wrap">
          <h2>Get in touch</h2>
          <a className="contact-mail" href={`mailto:${profile.email}`}>
            {profile.email.split("@")[0]}@<wbr />{profile.email.split("@")[1]}
          </a>
          <ul className="contact-links">
            <li><a href={profile.figma} target="_blank" rel="noreferrer">Figma</a></li>
            <li><a href={profile.cv} target="_blank" rel="noreferrer">View resume</a></li>
          </ul>
          {profile.contactForm && <ContactForm endpoint={profile.contactForm} email={profile.email} />}
        </div>
      </section>
    </>
  );
}
