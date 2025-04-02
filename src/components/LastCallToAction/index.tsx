import Link from "next/link";
import { Button } from "../ui/button";

const index = () => {
  return (
    <section className="mt-10 p-5 py-10 bg-gray-200">
      <div className="wrapper">
        <h2 className="text-3xl text-center font-semibold">
          Are you ready for the next step?
        </h2>
        <Button asChild className="mx-auto block w-fit my-3">
          <Link href="/login">Join Us</Link>
        </Button>
      </div>
    </section>
  );
};

export default index;
