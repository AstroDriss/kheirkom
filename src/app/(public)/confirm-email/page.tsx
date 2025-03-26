// import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ConfirmEmail = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const p = await searchParams;
  const email = p?.email;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>
            <h1>Confirm Your Email</h1>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p>
            We've sent a confirmation link to <b>{email}</b>. Please check your
            inbox and verify your email before signing in.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmEmail;
