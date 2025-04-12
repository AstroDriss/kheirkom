import Link from "next/link";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { fetchComments } from "@/actions/post";

interface Props {
  post_id: number;
  user_id: string | null;
}

const CommentsList = async ({ post_id, user_id }: Props) => {
  const { comments, error } = await fetchComments(post_id);

  if (error) return <p>Error</p>;

  return (
    <>
      {user_id ? (
        <div className="mb-4">
          <AddComment post_id={post_id} user_id={user_id} parent_id={null} />
        </div>
      ) : (
        <div className="rounded-lg p-4 flex items-start gap-2 justify-center bg-white">
          <Link href="/login" className="underline">
            log in
          </Link>{" "}
          to comment.
        </div>
      )}

      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} user_id={user_id} />
      ))}
    </>
  );
};

export default CommentsList;
