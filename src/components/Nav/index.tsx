import Logo from "@/assets/Logo";
import Link from "next/link";

interface NavigationLink {
  name: string;
  href: string;
}

const navigationLinks: NavigationLink[] = [
  { name: "How it works", href: "#how-it-works" },
  { name: "About", href: "#about" },
  { name: "FAQ", href: "#faq" },
];

export default function Nav() {
  return (
    <header className="border-b">
      <div className="max-w-7xl justify-between mx-auto flex items-center px-4 py-2">
        <Link href="/" prefetch={false}>
          <Logo height={40} />
          <span className="sr-only">Kheirkom home</span>
        </Link>

        <nav className="flex items-center gap-12">
          <ul className="md:flex gap-10 items-center hidden capitalize">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                {/* <Link href={link.href}>{link.name}</Link> */}
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/login"
          className="p-2 px-4 text-primary-foreground bg-primary rounded-md"
        >
          Register
        </Link>
      </div>
    </header>
  );
}
