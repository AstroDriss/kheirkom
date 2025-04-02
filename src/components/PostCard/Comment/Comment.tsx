import { CommentWithUser } from "@/actions/post";
import AddComment from "./AddComment";

interface Props {
  comment: CommentWithUser;
}

const Comment = ({ comment }: Props) => {
  return (
    <div className="border-l pl-4 mb-3">
      <p>
        <strong>
          {comment.user.first_name} {comment.user.last_name}
        </strong>
        : {comment.content}
      </p>
      <AddComment
        post_id={comment.post_id}
        user_id={comment.user_id}
        parent_id={comment.id}
      />

      {comment.replies.length > 0 && (
        <div className="ml-4">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
