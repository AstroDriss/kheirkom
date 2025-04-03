import { CommentWithReplies } from "@/actions/post";
import CommentContent from "./CommentContent";

interface Props {
  comment: CommentWithReplies;
  user_id: string | null;
}

const Comment = ({ comment, user_id }: Props) => {
  return (
    <div className="space-y-1 mb-3">
      <CommentContent comment={comment} user_id={user_id} />

      {comment.replies.length > 0 && (
        <div className="ml-4">
          <ul className="grid gap-4 pl-4 mt-2 border-l border-gray-300">
            {comment.replies.map((reply) => (
              <li key={reply.id}>
                <Comment comment={reply} user_id={user_id} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Comment;
