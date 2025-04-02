"use client";

import { toggleLike } from "@/actions/post";
import { Button } from "../ui/button";

import { useOptimistic, useState } from "react";

interface Props {
  user_id: string | null;
  post: {
    id: number;
    post_analytics: { likes_count: number } | null;
    user_liked?: { user_id: string | null }[];
  };
}

const LikeButton = ({ post, user_id }: Props) => {
  const [likes, setLikes] = useState({
    liked: post.user_liked && post.user_liked.length > 0 ? true : false,
    likes: post.post_analytics ? post.post_analytics.likes_count : 0,
  });
  const [optimisticLikes, addOptimisticLikes] = useOptimistic(
    likes,
    (_, optimisticLikes: { likes: number; liked: boolean }) => {
      return {
        liked: optimisticLikes.liked,
        likes: optimisticLikes.likes,
      };
    }
  );

  const formAction = async () => {
    if (!user_id) return;
    addOptimisticLikes({
      likes: optimisticLikes.likes + (optimisticLikes.liked ? -1 : 1),
      liked: !optimisticLikes.liked,
    });
    const { liked } = await toggleLike(post.id, user_id);
    setLikes((prev) => ({
      liked,
      likes: prev.likes + (liked ? 1 : -1),
    }));
  };

  return (
    <form action={formAction}>
      <Button type="submit" className="w-full" variant="ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill={optimisticLikes.liked ? "red" : "black"}
        >
          <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
        </svg>
        {optimisticLikes.likes} {optimisticLikes.likes === 1 ? "like" : "likes"}
      </Button>
    </form>
  );
};

export default LikeButton;
