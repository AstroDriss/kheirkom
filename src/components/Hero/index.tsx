import { Badge } from "../ui/badge";

const index = () => {
  return (
    <div className="mx-auto max-w-5xl pt-16 sm:pt-40 sm:pb-24">
      <div className="text-center">
        <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100 border-none">
          Faire une différence ensemble
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-[75px] md:4px">
          Connectez, Engagez, Partagez vos Actions Solidaires
        </h1>
        <p className="mt-6 text-lg leading-8 max-w-xl mx-auto">
          Une plateforme où les associations publient leurs besoins, et où les
          volontaires peuvent s&apos;engager, offrir leur temps et leurs
          compétences, et inspirer d&apos;autres à faire de même.
        </p>
      </div>
    </div>
  );
};

export default index;
