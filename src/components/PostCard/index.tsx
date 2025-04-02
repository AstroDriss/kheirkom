import { formatRelativeTime } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import LikeButton from "./LikeButton";
import Link from "next/link";

interface Post {
  id: number;
  content: string;
  created_at: string;
  user_liked?: { user_id: string | null }[];
  images: {
    images_url: string;
  }[];
  post_analytics: {
    likes_count: number;
  } | null;
  user: {
    first_name: string;
    last_name: string | null;
    profile_image: string | null;
  };
}

interface Props {
  post: Post;
  user_id: string | null;
}

const index = ({ post, user_id }: Props) => {
  return (
    <Card className="max-w-[29.3rem] mx-auto">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={post.user?.profile_image || ""} />
            <AvatarFallback>{post.user.first_name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col ml-3">
            <p className="text-sm font-semibold">
              {post.user.first_name} {post.user.last_name}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatRelativeTime(post.created_at)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="mb-3">{post.content}</p>
        {post.images.length > 0 && (
          <img
            src={post.images[0].images_url}
            alt={post.images[0].images_url}
          />
        )}
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <LikeButton post={post} user_id={user_id} />
        <Link
          className="flex items-center justify-center gap-2"
          href={`/app/post/${post.id}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M7.09 2.75a4 4 0 0 0-4 4v6.208a4 4 0 0 0 4 4h.093v3.792a.5.5 0 0 0 .839.368l4.52-4.16h4.369a4 4 0 0 0 4-4V6.75a4 4 0 0 0-4-4z"
            />
          </svg>
          Comments
        </Link>
      </CardFooter>
    </Card>
  );
};

export default index;
