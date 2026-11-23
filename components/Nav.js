import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const links = [
  ["Work", "/#work"],
  ["About", "/#about"],
  ["Contact", "/#contact"],
];

export default function Nav({ name, cv }) {
  return (
    <header className="nav">
      <Link href="/" className="brand">{name}</Link>
      <nav aria-label="Main">
        <ul>
          {links.map(([label, href]) => (
            <li key={href}><Link href={href}>{label}</Link></li>
          ))}
          <li><a href={cv} target="_blank" rel="noreferrer">Resume</a></li>
        </ul>
      </nav>
      <ThemeToggle />
    </header>
  );
}
