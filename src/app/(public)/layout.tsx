import Nav from "@/components/Nav";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <Nav />
      <main className="h-full">{children}</main>
    </div>
  );
}
