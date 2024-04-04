import CommentReply from "./CommentReply";
import style from "./CommentView.module.css";
import DateUploaded from "./DateUploaded";
import { getSession } from "../actions";

export default async function CommentView({ comment, image }) {
  const session = await getSession();

  return (
    <div className={style.container}>
      <div className={style.card}>
        <span className={style.wrapper}>
          <span className={style.header}>
            <p className={style.uploader}>{comment.uploader.username}</p>
            <span>•</span>
            <DateUploaded date={comment.createdAt} />
          </span>
          <p>{comment.message}</p>
        </span>

        {session && <CommentReply image={image} parent={comment._id} />}
      </div>

      {comment.replies.length > 0 &&
        comment.replies.map(function (reply) {
          return (
            <div key={reply._id} className={style.reply_wrapper}>
              <CommentView comment={reply} image={image} />
            </div>
          );
        })}
    </div>
  );
}
