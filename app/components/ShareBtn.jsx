"use client";

import style from "./ShareBtn.module.css";
import { toast } from "react-hot-toast";

export default function ShareBtn({ image }) {
  const handleShare = () => {
    // Copy URL to Clipboard
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/images/${image.slug}`
    );
    toast.success("Link copied!");
  };
  return (
    <div className={style.container}>
      <span
        className={`material-symbols-outlined ${style.share_icon}`}
        onClick={() => handleShare()}
      >
        share
      </span>
      <p>Share</p>
    </div>
  );
}
