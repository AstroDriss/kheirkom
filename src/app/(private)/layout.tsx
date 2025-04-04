import { getUser } from "@/actions/auth";
import AppNav from "@/components/Nav/AppNav";
import AuthProvider from "@/context/AuthProvider";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <div className="bg-gray-100 min-h-screen">
      <AppNav user={user} />
      <main>
        <AuthProvider>{children}</AuthProvider>
      </main>
    </div>
  );
}
