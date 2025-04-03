import Nav from "@/components/Nav";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>{children}</main>
    </div>
  );
}
