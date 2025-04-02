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
    <div className="my-4">
      <div className="mb-4">
        <AddComment post_id={post_id} user_id={user_id} parent_id={null} />
      </div>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsList;
