"use client";

import { fetchPosts } from "@/actions/post";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "./PostCard";
import { Loader2 } from "lucide-react";

interface Props {
  user_id: string | null;
}

const Feed = ({ user_id }: Props) => {
  const {
    data,
    isPending,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: { user_id, created_at: null, id: null },
    getNextPageParam: (lastPage) => {
      return lastPage.data.length ? lastPage.nextPage : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60, // 1 minute
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <section className="wrapper py-4">
      {isPending && (
        <p className="wrapper">
          <Loader2 className="animate-spin h-4 w-4" />
          Loading...
        </p>
      )}

      {data?.pages.map((page) => (
        <div className="space-y-4" key={page.nextPage.created_at}>
          {page.data.map((post) => (
            <PostCard post={post} user_id={user_id} key={post.id} />
          ))}
        </div>
      ))}

      <div ref={ref}>
        {isFetching && !isFetchingNextPage ? "Fetching..." : null}
      </div>
    </section>
  );
};

export default Feed;
