import Image from "next/image";
import Link from "next/link";

// MIDDLE LINKS DATA
interface ProductType {
  id: number;
  section: string;
  link: {
    name: string;
    href: string;
  }[];
}

const products: ProductType[] = [
  {
    id: 1,
    section: "Platform",
    link: [
      {
        name: "How It Works",
        href: "/#how-it-works",
      },
      {
        name: "Browse Associations",
        href: "#",
      },
      {
        name: "FAQ",
        href: "/#faq",
      },
    ],
  },
  {
    id: 2,
    section: "Company",
    link: [
      { name: "About us", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Contact us", href: "#" },
    ],
  },
  {
    id: 3,
    section: "Legal",
    link: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  },
];
const Footer = () => {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-12">
      <div className="px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Image src="/kheirkom-k.svg" width={70} height={80} alt="logo" />
            <p className="text-sm text-muted-foreground">
              Mettre en relation les personnes prêtes à aider avec les
              associations dans le besoin pour construire ensemble un monde
              meilleur.
            </p>
          </div>
          {products.map((product) => (
            <div className="space-y-4" key={product.id}>
              <h4>{product.section}</h4>

              <ul className="space-y-2 text-sm">
                {product.link.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kheirkom. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">Facebook</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </Link>
            <Link
              href="https://www.instagram.com/kheirkom_officiel/"
              target="_blank"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
