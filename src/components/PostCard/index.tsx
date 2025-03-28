import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface Post {
  id: number;
  content: string;
  created_at: string;
  images: {
    images_url: string;
  }[];
  likes: {
    count: number;
  }[];
  user: {
    first_name: string;
    last_name: string | null;
    profile_image: string | null;
  };
}

const formatRelativeTime = (createdAt: string) => {
  const now = new Date().valueOf();
  const postDate = new Date(createdAt).valueOf();
  const diffInSeconds = Math.floor((now - postDate) / 1000);

  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const units = [
    { unit: "year", value: 60 * 60 * 24 * 365 },
    { unit: "month", value: 60 * 60 * 24 * 30 },
    { unit: "day", value: 60 * 60 * 24 },
    { unit: "hour", value: 60 * 60 },
    { unit: "minute", value: 60 },
    { unit: "second", value: 1 },
  ];

  for (const { unit, value } of units) {
    const diff = Math.floor(diffInSeconds / value);
    if (Math.abs(diff) >= 1) {
      return formatter.format(diff, unit as Intl.RelativeTimeFormatUnit);
    }
  }

  return "just now";
};

const index = ({ post }: { post: Post }) => {
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
        <Button variant="ghost">
          {post.likes[0].count} {post.likes[0].count === 1 ? "like" : "likes"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default index;
