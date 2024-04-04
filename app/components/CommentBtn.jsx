"use client";

import { FaRegComment } from "react-icons/fa";
import style from "./CommentBtn.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CommentBtn({ image }) {
  const [commentCount, setCommentCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const getComment = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/`);
      const data = await res.json();

      const image_comment = data.filter(
        (comment) => image._id === comment.image
      );
      setCommentCount(image_comment.length);
    };

    getComment();
  });

  const handleClick = () => {
    router.push(`/images/${image.slug}`);
    router.refresh();
  };

  return (
    <div className={style.container}>
      <span className="icon" onClick={() => handleClick()}>
        <FaRegComment />
      </span>
      <span className={style.comment_count}>{commentCount}</span>
    </div>
  );
}
