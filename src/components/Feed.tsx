"use client";

import { fetchPosts } from "@/actions/post";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "./PostCard";

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
    initialPageParam: { user_id, created_at: null },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchOnWindowFocus: false,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <section className="wrapper">
      {isPending && <p>Loading...</p>}

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
