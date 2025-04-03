import { fetchPost } from "@/actions/post";
import PostCard from "@/components/PostCard";
import CommentsList from "@/components/PostCard/Comment/CommentsList";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const { post, user_id, error } = await fetchPost(Number(id));

  if (error || !post) return notFound();

  return (
    <div>
      <PostCard post={post} user_id={user_id} />

      <section id="comments" className="mx-auto max-w-3xl my-4 py-4 space-y-4">
        <CommentsList post_id={post.id} user_id={user_id} />
      </section>
    </div>
  );
};

export default page;
