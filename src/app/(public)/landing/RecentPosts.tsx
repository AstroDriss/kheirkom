import { PostWithDetails } from "@/actions/post";
import LikeButton from "@/components/PostCard/LikeButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle2, MessageCircle } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

const Post = ({ post }: { post: PostWithDetails }) => {
  return (
    <Card className="flex flex-col justify-between ">
      <CardHeader>
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

      <CardContent className="flex flex-col gap-2 flex-grow overflow-hidden">
        <p className="line-clamp-4 text-sm text-muted-foreground flex-1">
          {post.content}
        </p>

        {post.images.length > 0 && (
          <div className="h-[200px] w-full overflow-hidden rounded-md">
            <img
              src={post.images[0].images_url}
              alt="Post image"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-2 mt-auto">
        <LikeButton post={post} user_id={null} />
        <Link
          className="flex items-center justify-center gap-2"
          href={`/app/post/${post.id}#comments`}
        >
          <MessageCircle className="w-5" />
          {post.post_analytics?.comments_count}
          <span className="sr-only">Comments</span>
        </Link>
      </CardFooter>
    </Card>
  );
};

const RecentPosts = async () => {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `id, content, created_at,
    images (images_url),
    post_analytics!inner (likes_count, comments_count),
    user:users(id, first_name, last_name, profile_image, is_verified, role)`
    )
    .eq("user.role", "association")
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) return <p>error fetching posts</p>;

  return (
    <section id="recent" className="w-full py-12 md:py-24 lg:py-32">
      <div className="px-4 md:px-6">
        <h2 className="text-3xl text-center font-bold tracking-tighter sm:text-4xl md:text-5xl mb-10">
          Recent Announcements
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts?.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
