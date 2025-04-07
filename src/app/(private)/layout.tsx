import { getUser } from "@/actions/auth";
import AppNav from "@/components/Nav/AppNav";
import AuthProviderWrapper from "@/utils/AuthProviderWrapper";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <div className="bg-gray-100 min-h-full flex flex-col">
      <AppNav user={user} />
      <main className="flex-grow">
        <AuthProviderWrapper user={user}>{children}</AuthProviderWrapper>
      </main>
    </div>
  );
}
