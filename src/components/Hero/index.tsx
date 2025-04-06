import { Badge } from "../ui/badge";

const index = () => {
  return (
    <div className="mx-auto max-w-5xl pt-16 sm:pt-40 sm:pb-24">
      <div className="text-center">
        <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100 border-none">
          Making a Difference Together
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-[75px] md:4px">
          Connect, Donate, Share Your Good Deeds
        </h1>
        <p className="mt-6 text-lg leading-8 max-w-xl mx-auto">
          A platform where associations post their needs and people can donate
          items, share their contributions, and inspire others.
        </p>
      </div>
    </div>
  );
};

export default index;
