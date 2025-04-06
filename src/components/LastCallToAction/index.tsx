import Link from "next/link";
import { Button } from "../ui/button";

const index = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-rose-600 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Make a Difference?
            </h2>
            <p className="max-w-[900px] text-rose-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join our community of donors and associations working together to
              create positive change
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white text-rose-600 hover:bg-rose-100"
            >
              <Link href="/signup?as=user">Join as Donor</Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/signup?as=association">Register Association</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
