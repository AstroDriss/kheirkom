"use client";

import { fetchPosts } from "@/actions/post";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "./PostCard";

const Feed = () => {
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
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <section className="wrapper mt-4">
      {isPending && <p>Loading...</p>}

      {data?.pages.map((page) => (
        <div className="space-y-4" key={page.nextPage}>
          {page.data.map((post) => (
            <PostCard post={post} key={post.id} />
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
