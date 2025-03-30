import { formatRelativeTime } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import LikeButton from "./LikeButton";

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
      <CardFooter>
        <LikeButton post={post} user_id={user_id} />
      </CardFooter>
    </Card>
  );
};

export default index;
