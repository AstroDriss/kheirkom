"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { authContext } from "@/context/AuthProvider";
import useDebounce from "@/hooks/useDebounce";
import { createClient } from "@/utils/supabase/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import MessageButton from "../profile/[id]/MessageButton";
import Link from "next/link";

// TODO: Show verified State
const page = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  const auth = use(authContext);
  const currentUser = auth?.user;

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isPending } =
    useInfiniteQuery({
      queryKey: ["associations", debouncedQuery],
      initialPageParam: 0,
      queryFn: async ({ pageParam }) => {
        const supabase = createClient();
        const limit = 15;
        console.log({ debouncedQuery });

        const query = supabase
          .from("users")
          .select("id, first_name, profile_image, location")
          .eq("role", "association")
          .range(pageParam * limit, pageParam * limit + limit - 1);

        if (debouncedQuery.trim() !== "") {
          query.ilike("first_name", `%${debouncedQuery}%`);
        }
        const { data, error } = await query;
        if (error) throw error;

        return {
          data,
          nextPagePram: data.length > 0 ? pageParam++ : undefined,
        };
      },
      getNextPageParam: (lastPage) => {
        return lastPage.data.length > 0 ? lastPage.nextPagePram : undefined;
      },
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 10,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div className="wrapper mt-8">
      <div className="relative mb-7">
        <Search className="absolute w-4 left-4 top-1/2 -translate-1/2" />
        <Input
          value={query}
          className="pl-8 bg-background"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div>
        {isPending && <p>Loading...</p>}

        {data?.pages.map((page) => (
          <div key={page.nextPagePram} className="space-y-4">
            {page.data.map((user) => (
              <AssociationCard
                user={user}
                currentUserId={currentUser?.id || null}
                key={user.id}
              />
            ))}
          </div>
        ))}
      </div>

      {data?.pages.length === 0 && (
        <div ref={ref} style={{ height: "1px" }} className="w-full" />
      )}
    </div>
  );
};

const AssociationCard = ({
  user,
  currentUserId,
}: {
  user: {
    id: string;
    first_name: string;
    profile_image: string | null;
    location: string | null;
  };
  currentUserId: string | null;
}) => {
  return (
    <div className="p-4 rounded-xl flex gap-3 justify-between bg-background items-center">
      <Avatar>
        <AvatarImage src={user.profile_image || ""} alt={user.first_name} />
        <AvatarFallback>{user.first_name[0]}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <p className="font-semibold text-2xl">{user.first_name}</p>

        <Link
          href={`/app/profile/${user.id}`}
          className="text-muted-foreground text-sm truncate"
        >
          {user.location}
        </Link>
      </div>

      {currentUserId && <MessageButton user_id={currentUserId} />}
    </div>
  );
};

export default page;
