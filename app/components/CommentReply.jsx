"use client";

import { FaRegComment } from "react-icons/fa";
import style from "./CommentReply.module.css";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CommentReply({ image, parent }) {
  const [isReply, setIsReply] = useState(false);
  const [rows, setRows] = useState(0);
  const [message, setMessage] = useState("");
  const { data } = useSession();
  const auth_token = getCookie("auth_token");
  const router = useRouter();

  const handleReply = () => {
    setIsReply(true);
  };

  const handleClick = () => {
    setRows(5);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleCancel = () => {
    setRows(0);
    setIsReply(false);
  };

  const handleComment = async () => {
    const comment = {
      message,
      uploader: data.id,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${parent}/reply/${image._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
        body: JSON.stringify(comment),
      }
    );

    if (res.status === 200) {
      toast.success("Comment added.");
      setIsReply(false);
      setRows(0);
      setMessage("");
      router.refresh();
    }
  };

  return (
    <div className={style.container}>
      <span className={`icon ${style.wrapper}`} onClick={() => handleReply()}>
        <span>
          <FaRegComment />
        </span>
        <p>Reply</p>
      </span>

      {isReply && (
        <div className={style.add_reply}>
          <textarea
            className="textarea"
            type="text"
            placeholder="Add comment"
            rows={rows}
            onClick={() => handleClick()}
            onChange={(e) => handleChange(e)}
            value={message}
          />

          <span className={style.btn_group}>
            <button className={style.cancelbtn} onClick={() => handleCancel()}>
              Cancel
            </button>
            <button
              className={style.commentbtn}
              onClick={() => handleComment()}
            >
              Comment
            </button>
          </span>
        </div>
      )}
    </div>
  );
}
