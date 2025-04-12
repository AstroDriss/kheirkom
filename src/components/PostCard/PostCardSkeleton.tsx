import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PostCardSkeleton = () => {
  return (
    <Card className="max-w-[29.3rem] mx-auto gap-4 animate-pulse">
      <CardHeader>
        <div className="flex items-center gap-1">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-col ml-3 gap-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-3" />
        <Skeleton className="h-60 w-full rounded-lg" />
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-2">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
};
