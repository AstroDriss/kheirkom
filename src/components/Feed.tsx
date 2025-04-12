"use client";

import { fetchPosts } from "@/actions/post";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "./PostCard";
import { PostCardSkeleton } from "./PostCard/PostCardSkeleton";

interface Props {
  user_id: string | null;
}

const Feed = ({ user_id }: Props) => {
  const { data, isPending, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
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
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <section className="wrapper py-4">
      {isPending && (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      )}

      {data?.pages.map((page) => (
        <div className="space-y-4" key={page.nextPage.created_at}>
          {page.data.map((post) => (
            <PostCard post={post} user_id={user_id} key={post.id} />
          ))}
        </div>
      ))}

      {isFetchingNextPage && (
        <div className="space-y-4">
          {[1, 2].map((_, i) => (
            <PostCardSkeleton key={`next-${i}`} />
          ))}
        </div>
      )}

      {data?.pages.length === 0 && (
        <div ref={ref} style={{ height: "1px" }} className="w-full" />
      )}
    </section>
  );
};

export default Feed;
