"use client";

import { useState } from "react";
import style from "./CommentAdd.module.css";
import { useClickAway } from "@uidotdev/usehooks";
import { useSession } from "next-auth/react";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CommentAdd({ image, setIsReply, isReply, parent }) {
  const [isClick, setIsClick] = useState(false);
  const [rows, setRows] = useState(0);
  const [message, setMessage] = useState("");
  const { data } = useSession();
  const auth_token = getCookie("auth_token");
  const router = useRouter();

  const handleClick = () => {
    setIsClick(true);
    setRows(5);
  };

  const handleCancel = () => {
    setIsClick(false);
    setRows(0);
    setIsReply(false);
  };

  const ref = useClickAway(() => {
    setIsClick(false);
    setRows(0);
  });

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleComment = async () => {
    const comment = {
      image: image._id,
      message,
      uploader: data.id,
      parent,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comment/create`,
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
      setIsClick(false);
      setIsReply(false);
      setRows(0);
      setMessage("");
      router.refresh();
    }
  };

  return (
    <div className={style.container}>
      <textarea
        className="textarea"
        type="text"
        placeholder="Add comment"
        rows={rows}
        onClick={() => handleClick()}
        onChange={(e) => handleChange(e)}
        value={message}
      />
      {(isClick || isReply) && (
        <span className={style.btn_group} ref={ref}>
          <button className={style.cancelbtn} onClick={() => handleCancel()}>
            Cancel
          </button>
          <button className={style.commentbtn} onClick={() => handleComment()}>
            Comment
          </button>
        </span>
      )}
    </div>
  );
}
