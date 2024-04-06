import style from "./CommentDeleteBtn.module.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteComment, updateCommentFlag } from "../actions";

export default function CommentDeleteBtn({ comment }) {
  const router = useRouter();

  const handleClick = async () => {
    if (comment.replies.length > 0) {
      updateCommentFlag(comment);
    } else {
      deleteComment(comment);
    }

    toast.success("Comment deleted!");
    router.refresh();
  };

  return (
    <div className={style.container}>
      <p className={style.delete_btn} onClick={() => handleClick()}>
        Delete
      </p>
    </div>
  );
}
