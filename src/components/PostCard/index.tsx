import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import LikeButton from "./LikeButton";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { PostWithDetails } from "@/actions/post";

interface Props {
  post: PostWithDetails;
  user_id: string | null;
}

const index = ({ post, user_id }: Props) => {
  return (
    <Card className="max-w-[29.3rem] mx-auto gap-4">
      <CardHeader className="">
        <div className="flex items-center gap-1">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.user?.profile_image || ""} />
            <AvatarFallback>{post.user.first_name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col ml-3">
            <p className="text-sm font-semibold flex items-center gap-1">
              <Link href={`/app/profile/${post.user.id}`}>
                {post.user.first_name} {post.user.last_name}
              </Link>

              {post.user.is_verified && (
                <CheckCircle2
                  aria-label="verified association"
                  className="text-blue-500 w-4"
                />
              )}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(post.created_at, { addSuffix: true })}
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
          href={`/app/post/${post.id}#comments`}
        >
          <MessageCircle className="w-5" />
          {post.post_analytics?.comments_count || 0}
          <span className="sr-only">Comments</span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default index;
