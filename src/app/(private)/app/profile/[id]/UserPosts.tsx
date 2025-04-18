"use client";

import PostCard from "@/components/PostCard";
import { PostCardSkeleton } from "@/components/PostCard/PostCardSkeleton";
import { authContext } from "@/context/AuthProvider";
import { createClient } from "@/utils/supabase/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { use, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  user_id: string;
}

const UserPosts = ({ user_id }: Props) => {
  const auth = use(authContext);
  const user = auth?.user;

  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", user_id],
      queryFn: async ({ pageParam }: { pageParam: string | null }) => {
        const supabase = createClient();

        const limit = 10;

        let query;

        if (user) {
          query = supabase
            .from("posts")
            .select(
              `
        id,
        user_id, 
        content, 
        created_at, 
        images (images_url), 
        post_analytics (likes_count, comments_count),
        user:users(id, first_name, last_name, profile_image, is_verified),
        user_liked:likes(user_id)
    `
            )
            .eq("user_id", user_id)
            .eq("likes.user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(limit);
        } else {
          query = supabase
            .from("posts")
            .select(
              `id, user_id, content, created_at,
    images (images_url),
    post_analytics!inner (likes_count, comments_count),
    user:users(id, first_name, last_name, profile_image, is_verified)`
            )
            .eq("user_id", user_id)
            .order("created_at", { ascending: false })
            .limit(limit);
        }

        if (pageParam) {
          query = query.gt(`created_at`, pageParam);
        }

        const { data, error } = await query;

        if (error) throw error;

        return {
          data,
          nextPage: data.length > 0 ? data[data.length - 1].created_at : null,
        };
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => {
        return lastPage.data.length > 0 ? lastPage.nextPage : undefined;
      },
      refetchOnWindowFocus: false,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <section>
      <h2 className="mb-3 mt-4 text-center text-2xl">Posts</h2>

      {isPending && (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!data && <p>No Posts Yet!</p>}

      {data?.pages.map((page) => (
        <div key={page.nextPage} className="space-y-4">
          {page.data.map((post) => (
            <PostCard post={post} key={post.id} user_id={user?.id || null} />
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

export default UserPosts;
