import Link from "next/link";

export default function NotFound() {
  return (
    <section className="project-head wrap">
      <h1 className="display">Page not found</h1>
      <p className="back" style={{ marginTop: 28 }}><Link href="/">Back to the homepage</Link></p>
    </section>
  );
}
