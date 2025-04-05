import Logo from "@/assets/Logo";
import Link from "next/link";

interface NavigationLink {
  name: string;
  href: string;
}

const navigationLinks: NavigationLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const LandingNav = () => {
  return (
    <nav className="ml-auto flex items-center gap-12">
      <ul className="md:flex gap-5 items-center hidden">
        {navigationLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>

      <Link
        href="/login"
        className="p-2 px-4 text-primary-foreground bg-primary rounded-md"
      >
        Join our Community
      </Link>
    </nav>
  );
};

export default function Nav() {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto flex items-center px-4 py-2">
        <Link href="/" prefetch={false}>
          <Logo height={40} />
          <span className="sr-only">Kheirkom</span>
        </Link>

        <LandingNav />
      </div>
    </header>
  );
}
