"use client";

import { useState } from "react";
import CommentReplyBtn from "./CommentReplyBtn";
import style from "./CommentView.module.css";
import DateUploaded from "./DateUploaded";
import { useSession } from "next-auth/react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import CommentDeleteBtn from "./CommentDeleteBtn";

export default function CommentView({ comment }) {
  const { data } = useSession();
  const [hideReply, setHideReply] = useState(true);

  const handleToggle = () => {
    if (hideReply) {
      setHideReply(false);
    } else {
      setHideReply(true);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.card}>
        <span className={style.wrapper}>
          <span className={style.header}>
            <p className={style.uploader}>{comment.uploader.username}</p>
            <span>•</span>
            <DateUploaded date={comment.createdAt} />
          </span>

          {comment.isDeleted ? (
            <div className={style.comment_deleted}>Comment Deleted</div>
          ) : (
            <p>{comment.message}</p>
          )}
        </span>

        <span className={style.btn_group}>
          {data && <CommentReplyBtn comment={comment} />}
          {data && data.id === comment.uploader._id && !comment.isDeleted && (
            <CommentDeleteBtn comment={comment} />
          )}
        </span>

        {comment.replies.length > 0 && (
          <button
            onClick={() => handleToggle()}
            className={style.hide_reply_btn}
          >
            {hideReply && <FiPlusCircle />}
            {!hideReply && <FiMinusCircle />}
          </button>
        )}
      </div>

      <span className={style.reply_vertical_line}></span>

      {comment.replies.length > 0 &&
        !hideReply &&
        comment.replies.map(function (reply) {
          return (
            <div key={reply._id} className={style.reply_wrapper}>
              <CommentView comment={reply} />
            </div>
          );
        })}
    </div>
  );
}
