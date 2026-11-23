import { Cherry_Bomb_One, Nunito } from "next/font/google";
import Nav from "@/components/Nav";
import { getProfile } from "@/lib/content";
import "./globals.css";

const display = Cherry_Bomb_One({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const text = Nunito({ subsets: ["latin"], variable: "--font-text" });

export function generateMetadata() {
  const { name, role, intro } = getProfile();
  return {
    title: { default: `${name}, ${role}`, template: `%s, ${name}` },
    description: intro,
  };
}

// Applies the saved theme before first paint so there is no flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }) {
  const profile = getProfile();
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Nav name={profile.displayName ?? profile.name} cv={profile.cv} />
        <main id="main">{children}</main>
        <footer className="footer">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <a href={profile.figma} target="_blank" rel="noreferrer">Figma</a>
        </footer>
      </body>
    </html>
  );
}
